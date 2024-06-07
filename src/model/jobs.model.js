let jobs =[
    {   id: 1,
        type: 'Tech',
        designation: 'SDE', 
        location: 'Gurgoo IND Remote',
        name:'Coding Ninjas',
        salary:'14-20Lpa',  
        applyby: '2023-08-30',
        skills:['React', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        openings: 5,
        jobposted: '10/2/2023 12:43:48 pm',
        applicants: []
    },
    {   id: 2,
        type: 'Tech',
        designation: 'Angular Developer', 
        location: 'Pune IND On-Site',
        name:'Go Digit',
        salary:'5-10Lpa',  
        applyby: '2023-12-30',
        skills:['Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        openings: 5,
        jobposted: '10/4/2024 12:43:48 pm',
        applicants: []
    },
    {   id: 3,
        type: 'Tech',
        designation: 'SDE', 
        location: 'Bangalore IND',
        name:'Juspay',
        salary:'20-26Lpa',  
        applyby: '2024-01-21',
        skills:['React', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
        openings: 5,
        jobposted: '10/7/2023 12:43:48 pm',
        applicants: []
    }
  ];

  export default class Jobs{
    getJobs(){
       return jobs; 
    }

    getJobDetails(id){
        return jobs.find(job=>job.id==id);
    }

    addApplications(details,id){
        jobs.forEach(job=>{
            if(job.id == id){
                job.applicants.push({id:job.applicants.length+1,...details});
            }
        })
    }

    addJob(details){
        const id=jobs.length+1;
        const jobposted=formatDate(new Date());
        details.id=id;
        details.jobposted=jobposted;
        details.applicants=[];
        jobs.push(details);
    }


    updateJobDetails(job){
        const index = jobs.findIndex(v => v.id == job.id);
        if (index !== -1) {
            // Merge the new details into the existing job
            jobs[index] = { ...jobs[index], ...job };
        } else {
            console.log(`Job with id ${job.id} not found.`);
        }
    }
    deleteJob(id){
        jobs=jobs.filter(job=>job.id != id);
    }



  }



  function formatDate(date) {
    // Get components of the date
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based
    let year = date.getFullYear();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Format components to ensure two digits
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    // Determine AM/PM
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust hours to 12-hour format

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}

