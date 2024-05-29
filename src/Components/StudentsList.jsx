import React, { useState, useEffect } from 'react';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [avatars, setAvatars] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const studentsPerPage = 9;
  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://3.223.98.72:1337/api/students/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('API response:', data);
        setStudents(data.data.reverse()); // Reverse the data here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10'); // Adjust the number of results as needed
        if (!response.ok) {
          throw new Error('Failed to fetch avatars');
        }
        const data = await response.json();
        setAvatars(data.results.map(user => user.picture.thumbnail));
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, []);

  // Pagination calculation
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('accessToken');
    
    // Redirect to the root URL or any other page
    window.location.href = '/'; // Navigate to the root URL
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-violet-600">
    <div className="flex flex-row flex-grow">
     {/* sidebar */}
      <div className="w-20 bg-violet-600 flex flex-col items-center py-4">
        <div className="w-12 h-12 flex items-center justify-center mb-auto">
          <img src='/logo.png' alt="Logo" className="w-12 h-12 mt-12" />
        </div>
        <div className="flex-grow flex flex-col items-center space-y-8 justify-center">
          <div className="relative group">
            {selectedIcon === 'user' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
            <img
              src='/user1.png'
              alt="Icon"
              className={`w-12 h-12 cursor-pointer ${selectedIcon === 'user' ? 'bg-purple-800 rounded-full' : ''}`}
              onClick={() => setSelectedIcon('user')}
            />
          </div>
          <div className="relative group">
            {selectedIcon === 'hat' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
            <img
              src='/hat1.png'
              alt="Icon"
              className={`w-10 h-9 cursor-pointer ${selectedIcon === 'hat' ? 'bg-purple-800 rounded-full' : ''}`}
              onClick={() => setSelectedIcon('hat')}
            />
          </div>
          <div className="relative group">
            {selectedIcon === 'file' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
            <img
              src='/file1.png'
              alt="Icon"
              className={`w-8 h-8 cursor-pointer ${selectedIcon === 'file' ? 'bg-purple-800 rounded-full' : ''}`}
              onClick={() => setSelectedIcon('file')}
            />
          </div>
          <div className="relative group">
            {selectedIcon === 'setting' && <div className="absolute left-0 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white"></div>}
            <img
              src='/setting1.png'
              alt="Icon"
              className={`w-12 h-8 cursor-pointer ${selectedIcon === 'setting' ? 'bg-purple-800 rounded-full' : ''}`}
              onClick={() => setSelectedIcon('setting')}
            />
          </div>
        </div>
        <div className="mt-auto">
          <img src='/logout.png' alt="Logout Icon" className="w-10 h-10 mb-12 cursor-pointer" onClick={handleLogout} />
        </div>
      </div>


        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg ml-12 mt-12 mr-8 mb-6 shadow-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold">Students</h1>
              <span className="bg-purple-200 text-purple-700 rounded-full px-3 py-1 text-sm">{students.length}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-zinc-300 rounded-full px-12 py-2 mr-6"
              />
               <img
              src='/file2.png'
              alt="Icon"
              className="w-8 h-8"
            />
              <img
              src='/bell.png'
              alt="Icon"
              className="w-8 h-8"
            />
              <img src="/staff.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
            </div>
          </div>
          <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
          <div className="flex justify-between items-center mb-4">
            <select className="border border-zinc-300 rounded-full px-4 py-2">
              <option>Select school</option>
              <option>Big Ben</option>
            </select>
            <button className="bg-purple-700 text-white rounded-full px-4 py-2 flex items-center space-x-2">
              <img src='/user1.png' className='w-8 h-8' alt="Add Icon" />
              <span>Add a student</span>
            </button>
          </div>

          <div className="flex-grow overflow-x-auto">
            <table className="min-w-full border bg-white">
              <thead>
                <tr className="w-full bg-zinc-100 text-left">
                <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Photo</th>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">First name</th>
                  <th className="py-3 px-4">Last name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Gender</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr key={student.id} className="border-b">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="form-checkbox" />
                    </td>
                    <td className="py-3 px-4">
                      <img src={avatars[index % avatars.length] || 'https://placehold.co/32x32'} alt="Student Photo" className="w-8 h-8 rounded-full" />
                    </td>
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4">{student.attributes.firstName}</td>
                    <td className="py-3 px-4">{student.attributes.lastName}</td>
                    <td className="py-3 px-4">{student.attributes.parentEmailId}</td>
                    <td className="py-3 px-4">{student.attributes.parentContactNo}</td>
                    <td className="py-3 px-4">{student.attributes.gender}</td>
                  </tr>
                  
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-zinc-200 text-zinc-700 rounded-full px-4 py-2"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-zinc-500">{currentPage} of {totalPages}</span>
            <button
              className="bg-zinc-200 text-zinc-700 rounded-full px-4 py-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
