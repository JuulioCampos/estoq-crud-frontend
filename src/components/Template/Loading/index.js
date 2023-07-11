import './index.css';
export const Loading = (props) => {
    return (
        <div id='spinner-loading'>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}