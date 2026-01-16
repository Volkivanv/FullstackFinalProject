export default function Sidebar(props) {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>React Chat</h2>
                    <h3>
                        {/* <FiberManualRecordIcon /> */}
                    {props.userName}

                    </h3>
                </div>
            </div>
        </div>
    );



};

