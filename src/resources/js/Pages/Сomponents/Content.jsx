export default function Content(props) {
    if (props) {
        return (
            <div className="content">
                <h1 className="title text-gray-700 dark:text-blue-400">Hello {props.data.user.name}</h1>
                <p>{props.data.user.lastname}</p>
            </div>
        );

    } else {
        <div className="content">
            <h1 className="title text-gray-700 dark:text-blue-400">Content not found</h1>

        </div>
    }
}

