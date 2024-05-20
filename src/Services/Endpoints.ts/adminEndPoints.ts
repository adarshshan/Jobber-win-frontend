const adminRoutes = {
    login: "/admin/login",
    getAllUsers: "/admin/users",
    blockUser: "/admin/users/block/",
    logout: "/admin/logout",
    getPostReports: '/admin/get-all-postreports',
    getJobReports: '/admin/get-all-jobreports',
    removeReportedJob: '/admin/change-report-status/',
    removeReportedPost: '/admin/change-status-post/',
    closePostReport: '/admin/delete-post-report/',
    closeJobReport: '/admin/delete-job-report/',

    subscription:'/admin/subscription',
}


export default adminRoutes;