import React, { useState } from 'react';
import axios from 'axios';

const Job = () => {
  const [jobData, setJobData] = useState([]);  // Holds the fetched job data
  const [query, setQuery] = useState('');  // Holds the search query
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState('');  // Error message
  const [msg,setmsg] = useState('The Path to Your Future Starts Here')

  // Function to fetch jobs from Adzuna API
  const fetchJobs = async () => {
    setLoading(true);  // Set loading state to true before request
    setError('');  // Reset error state before making a new request

    try {
      // Construct the API URL using the query provided by the user
      const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=9b61ecc9&app_key=4b132fe1f526cb72f6053a457509ea37&results_per_page=20&what=${query}`);
      
      // Set job data if the request is successful
      setJobData(response.data.results);
    } catch (err) {
      // Set error message if there's an error
      setError('Error fetching jobs. Please try again.');
    } finally {
      // Set loading state to false after the request is completed
      setLoading(false);
      setmsg('Results')
    }
  };

  return (
    <div>
      <nav className="menu">
      <h1 >Job Finder</h1>
       <div> <input
          type="text"
          placeholder="Search Jobs...."
          value={query}  // Bind input to query state
          onChange={(e) => setQuery(e.target.value)}  // Update query state on input change
        />
<button onClick={fetchJobs} class="boton-elegante">Explore</button>
        </div>
      </nav>


      {loading && <p>Loading...</p>}  {/* Display loading message when fetching data */}
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message if any */}
      <h1 className='myhead' >{msg}</h1>

      <div className='jobcontainer'>
      {jobData.length > 0 ? 
        jobData.map((job,index)=>(
            <div className='jobbox' key={index}>
                <h1>{job.title}</h1>
                <p><strong>Type</strong>  {job.category.label}</p>
                <p> <strong> Location: </strong> {job.location.display_name}</p>
                <p><strong>Salary: </strong> {job.salary_max}</p>
                <p>{job.contract_time}</p>
                <a href={job.redirect_url}><button><span class="text">Apply Now</span></button></a>
            </div>
        )):(
            <p></p>
        )  
    
    }
      </div>
    </div>
  );
};

export default Job;
