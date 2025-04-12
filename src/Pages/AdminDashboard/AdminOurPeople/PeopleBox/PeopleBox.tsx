import { toast } from "sonner";
import { useDeleteOurPeopleMutation } from "../../../../redux/api/features/OurPeople/ourPeopleManagementApi";
import { TOurPeople } from "../../../../utils/types/globalTypes";
import { sonarId } from "../../../../utils/Fucntion/sonarId";
import UpdateOurPeople from "../UpdateOurPeople/UpdateOurPeople";

interface IProps {
  people: TOurPeople;
  admin?: boolean;
}

const PeopleBox = ({ people, admin = false }: IProps) => {
  const [deleteOurPeople] = useDeleteOurPeopleMutation();
  const handleDelete = async (id: string) => {
    toast.loading("Deleting", { id: sonarId });
    try {
      const res = await deleteOurPeople(id).unwrap();
      console.log("Res: ", res);
      if (res?.success) {
        toast.success("Deleted Successfully", { id: sonarId });
      }
    } catch {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white border border-gray-100 hover:border-gray-200">
      {/* Admin Controls */}
      {admin && (
        <div className="absolute top-4 right-4 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <UpdateOurPeople data={people} />

          <button
            onClick={() => handleDelete(people?._id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-red-50 text-red-600 transition-colors"
            aria-label="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Profile Image with Gradient Overlay */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={people.image || "https://via.placeholder.com/400x400"}
          alt={people.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Profile Content */}
      <div className="p-5">
        {/* Order Badge */}
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          #{people.order}
        </div>

        {/* Name and Designation */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {people.name}
          </h3>
          <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {people.designation}
          </p>
        </div>

        {/* Course */}
        {people.course && (
          <p className="text-xs font-medium text-gray-500 mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {people.course}
          </p>
        )}

        {/* Message/Bio */}
        {admin && (
          <div>
            {people.message && (
              <div className="bg-gray-50/70 backdrop-blur-sm rounded-lg p-3 mb-4 border border-gray-100">
                <p className="text-sm text-gray-600 italic line-clamp-3">
                  "{people.message}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Social Links */}
        <div className="flex items-center space-x-4 mt-4">
          {people.facebook && (
            <a
              href={people.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook Profile"
              className="group relative text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-600 transition-all p-2 rounded-full shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          )}
          {people.portfolio && (
            <a
              href={people.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              title="Portfolio Website"
              className="group relative text-gray-700 hover:text-white bg-gray-200 hover:bg-gray-700 transition-all p-2 rounded-full shadow-sm hover:shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleBox;
