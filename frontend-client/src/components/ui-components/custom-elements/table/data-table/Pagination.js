
const Pagination = () => {
    return (
        <nav className="flex items-center justify-between p-4 ">
            <span className="text-sm font-normal dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900">1000</span></span>
            <ul className="inline-flex items-center -space-x-px">
            </ul>
        </nav>
    )
}

export {
    Pagination
}