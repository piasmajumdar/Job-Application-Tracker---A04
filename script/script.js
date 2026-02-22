let interviewList = [];
let rejectedList = [];
let currentFilter = 'all-filter-btn';

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


const interviewCount = document.getElementById('interview');
const rejectedCount = document.getElementById('rejected');

const allCardsSection = document.getElementById('allCards');  //get the total cards no.
let total = allCardsSection.children.length;


const noJobsSection = document.getElementById('no-jobs'); // no-jobs section

let subTotalElement = document.getElementById('sub-total-Element');
let subTotalCount = document.getElementById('sub-total-count');

const filteredSection = document.getElementById('filtered-section');


function setTotal() { // Set total job count
    const totalCount = document.querySelectorAll('.total'); // set the total count
    for (let item of totalCount) {
        item.innerText = total;
    }
}

// Set the count for Total, Interview, Rejected
function calculateCount() {
    setTotal();
    // set interview count
    interviewCount.innerText = interviewList.length;
    // need to write in the side of available jobs

    // set rejected count
    rejectedCount.innerText = rejectedList.length;
    // need to write in the side of available jobs

}
calculateCount();


function toggleOpt(id) {
    //button design change
    allFilterBtn.classList.remove('btn-primary');
    interviewFilterBtn.classList.remove('btn-primary');
    rejectedFilterBtn.classList.remove('btn-primary');
    document.getElementById(id).classList.add('btn-primary');

    //Section Filtering
    allCardsSection.classList.add('hidden');
    noJobsSection.classList.add('hidden');
    subTotalElement.classList.add('hidden');

    currentFilter = id;

    if (id == 'all-filter-btn') {
        if (total > 0) {
            allCardsSection.classList.remove('hidden');
            filteredSection.classList.add('hidden');

        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
    else if (id == 'interview-filter-btn') {
        subTotalElement.classList.remove('hidden');
        subTotalCount.innerText = interviewList.length;
        if (interviewList.length > 0) {
            allCardsSection.classList.add('hidden');
            filteredSection.classList.remove('hidden');
            // renderInterview();


        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
    if (id == 'rejected-filter-btn') {
        subTotalElement.classList.remove('hidden');
        console.log(rejectedList.length);
        subTotalCount.innerText = rejectedList.length;
        if (rejectedList.length > 0) {
            allCardsSection.classList.add('hidden');
            filteredSection.classList.remove('hidden');
            // renderRejected();
        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
}

// Interview-btn and Rejected-btn functionality using Event delegation 
document.querySelector('main').addEventListener('click', function (event) {
    // console.log(event.target);
    if (event.target.classList.contains('interview-btn')) {
        // fetch the data
        const parentNode = event.target.parentNode.parentNode;
        const cardInfo = getData(parentNode);

        // set job-status
        parentNode.querySelector('.job-status').innerText = 'INTERVIEW';
        cardInfo.jobStatus = 'INTERVIEW';
        console.log(cardInfo);

        // filter out the data from rejectedList
        rejectedList = rejectedList.filter(item => 
            !(item.CompanyName == cardInfo.CompanyName &&
            item.position == cardInfo.position &&
            item.location == cardInfo.location));
        
        console.log(rejectedList);

        // check that already in interviewList
        let ExistInterviewList = interviewList.find(item => item.CompanyName == cardInfo.CompanyName &&
            item.position == cardInfo.position &&
            item.location == cardInfo.location);
        console.log(ExistInterviewList);
        if (!ExistInterviewList) {
            //-----false>> push the data to interviewList
            interviewList.push(cardInfo);
            console.log(interviewList);

        }
        // make count()
        calculateCount();

        // if we're in rejected-filter-btn page,
        if (currentFilter == 'rejected-filter-btn') {
            //----------renderRejected()

        }
        //renderInterview();
    }


    else if (event.target.classList.contains('rejected-btn')) {
        // fetch the data
        const parentNode = event.target.parentNode.parentNode;
        const cardInfo = getData(parentNode);

        // set job-status
        parentNode.querySelector('.job-status').innerText = 'REJECTED';
        cardInfo.jobStatus = 'REJECTED';

        // filter out the data from interviewList
        interviewList = interviewList.filter(item =>
            !(item.CompanyName == cardInfo.CompanyName &&
            item.position == cardInfo.position &&
            item.location == cardInfo.location));

        // check that already in rejectedList
        let ExistRejectedviewList = rejectedList.find(item => item.CompanyName == cardInfo.CompanyName &&
            item.position == cardInfo.position &&
            item.location == cardInfo.location);
        console.log(ExistRejectedviewList);
        if (!ExistRejectedviewList) {
            //-----false>> push the data to rejectedList
            rejectedList.push(cardInfo);
            console.log(rejectedList);

        }
        // make count()
        calculateCount();

        // if we're in interview-filter-btn page,
        if (currentFilter == 'interview-filter-btn') {
            //----------renderInterview()

        }
        //renderRejected();
    }

    else if (event.target.classList.contains('job-delete')) {
        alert('delete button clicked')
    }
})



function getData(jobParentCard) {
    const CompanyName = jobParentCard.querySelector('.job-companyName').innerText;
    const position = jobParentCard.querySelector('.job-position').innerText;
    const location = jobParentCard.querySelector('.job-location').innerText;
    const type = jobParentCard.querySelector('.job-type').innerText;
    const salary = jobParentCard.querySelector('.job-salary').innerText;
    const jobStatus = jobParentCard.querySelector('.job-status').innerText;
    const description = jobParentCard.querySelector('.job-description').innerText;

    const cardInfo = {
        CompanyName,
        position,
        location,
        type,
        salary,
        jobStatus,
        description
    }
    return cardInfo;

}
