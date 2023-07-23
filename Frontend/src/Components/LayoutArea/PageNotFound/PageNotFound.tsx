import "./PageNotFound.css";
//דף שלא נמצא - במידה והגענו לדף כזה
function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <h2>The page you are looking for doesn't exist.</h2>
        </div>
    );
}

export default PageNotFound;
