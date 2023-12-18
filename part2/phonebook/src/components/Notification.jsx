const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }
    let style = 'green'
    if (type === 'error') {
        style = {
            color: 'red',
        }
    }

    return (
        <div style={style} className='notification'>
            {message}
        </div>
    )
}

export default Notification
