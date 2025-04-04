import { useQuery } from "@apollo/client";
import { QUERY_TOP_PLANTS } from "../utils/queries";

const Test = () => {
    const { loading, data } = useQuery(QUERY_TOP_PLANTS);

    const results = data?.plants || [];

    if(!loading) {
        console.log(results);
    }

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>{results}</div>
                )}
            </div>
        </div>
    );
}

export default Test;