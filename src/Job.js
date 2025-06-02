import React, { useState } from 'react';
import axios from 'axios';

const Job = () => {
  const [jobData, setJobData] = useState([]);     // Holds fetched jobs
  const [query, setQuery] = useState('');         // User's search query
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState('');         // Error message
  const [msg, setMsg] = useState('The Path to Your Future Starts Here');

  // Fetch jobs from Adzuna API
  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    setMsg(''); // Clear old message

    try {
      const response = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=9b61ecc9&app_key=4b132fe1f526cb72f6053a457509ea37&results_per_page=100&what=${query}`
      );
      
      const results = response.data.results;

      setJobData(results);
      if (results.length === 0) {
        setMsg('No jobs found.');
      } else {
        setMsg('Here are the jobs we found!');
      }

    } catch (err) {
      setError('Error fetching jobs. Please try again.');
      setJobData([]);
      setMsg('');
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key to trigger search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchJobs();
    }
  };

  return (
    <div>

      <nav>
      <p>Developed by Zeeshan</p>
      
          <input
            type="text"
            placeholder="Explore Jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
         
               {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && msg && <h1 className="myhead">{msg}</h1>}

      {loading && <p>Loading...</p>}
      </nav>
     
      <div className="jobcontainer">
        {jobData.length > 0 ? (
          jobData.map((job, index) => (
            <div className="jobbox" key={index}>
              <h1>{job.title}</h1>
              <p><strong>Type:</strong> {job.category.label}</p>
              <p><strong>Location:</strong> {job.location.display_name}</p>
              <p><strong>Salary:</strong> {job.salary_max}</p>
              <p>{job.contract_time}</p>
              <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                <button><span className="text">Apply Now</span></button>
              </a>
            </div>
          ))
        ) : (
          !loading && query && <p>No jobs available for the current search.</p>
        )}
      </div>
    </div>
  );
};

export default Job;
