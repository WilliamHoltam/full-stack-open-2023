const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }
    let style = { color: 'green' }
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
