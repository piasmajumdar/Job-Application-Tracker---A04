interviewList = [];
rejectedList = [];

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


const interviewCount = document.getElementById('interview');
const rejectedCount = document.getElementById('rejected');

const allCardsSection = document.getElementById('allCards');  //get the total cards no.
let total = allCardsSection.children.length;


const noJobsSection = document.getElementById('no-jobs'); // no-jobs section

const subTotalElement = document.getElementById('sub-total-Element');
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

    if (id == 'all-filter-btn') {
        if (total > 0) {
            allCardsSection.classList.remove('hidden');
            filteredSection.classList.add('hidden');

        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
    else if (id == 'interview-filter-btn') {
        subTotalCount.innerText = interviewList.length;
        subTotalElement.classList.remove('hidden');
        if (interviewList.length > 0) {
            allCardsSection.classList.add('hidden');
            filteredSection.classList.remove('hidden');
            // renderInterview();


        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
    if (id == 'rejected-filter-btn') {
        rejectedCount.innerText = rejectedList.length;
        subTotalElement.classList.remove('hidden');
        if (rejectedList.length > 0) {
            allCardsSection.classList.add('hidden');
            filteredSection.classList.remove('hidden');
            // renderRejected();
        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
}
