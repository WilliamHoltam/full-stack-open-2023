const dummy = (blogs) => {
    return 1
}

const totalLikes = listBlogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return listBlogs.length === 0
        ? 0
        : listBlogs.reduce(reducer, 0)
}

const favoriteBlog = listBlogs => {
    const reducer = (prev, current) => {
        return prev.likes > current.likes ? prev : current
    }

    return listBlogs.length === 0
        ? {}
        : listBlogs.reduce(reducer)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
