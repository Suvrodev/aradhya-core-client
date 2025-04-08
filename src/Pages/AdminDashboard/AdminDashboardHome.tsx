const AdminDashboardHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-teal-400">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-300">
            Manage <span className="text-blue-500 font-bold">Aradhya Core</span>{" "}
            with ease and efficiency.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-400">
          <p>© 2025 Aradhya Core. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
