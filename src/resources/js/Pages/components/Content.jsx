export default function Content({props}) {
    if (props.data) {
        return (
            <div className="content">
                <h1>{props.data.title}</h1>
                <p>{props.data.content}</p>
            </div>
        );

    };
}

