import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const List = () => {
    const [problems, setProblems] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        console.log("useEffect");
        const getProblems = async () => {
            try {
                const response = await axiosPrivate.get('/problems', {
                    signal: controller.signal
                })
                const problemTitles = response.data.map(problem => problem.title)
                console.log(response.data);
                isMounted && setProblems(problemTitles);
            } catch (error) {
                console.error(error);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProblems();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Problems List</h2>
            {problems.length
                ? (
                    <ul>
                        {problems.map((problem, i) => <li key={i}>{problem}</li>)}
                    </ul>
                ) : <p>No problems to display.</p>
            }
        </article>
    )
}

export default List