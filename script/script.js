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

            function jobStatusUpdate() {
                const allSection_items = allCardsSection.children;
                for (let item of allSection_items) {
                    // console.log(item);
                    for (let iL of interviewList) {
                        if (iL.CompanyName == item.querySelector('.job-companyName').innerText) {
                            item.querySelector('.job-status').innerText = iL.jobStatus;
                        }
                    }
                    for (let rL of rejectedList) {
                        if (rL.CompanyName == item.querySelector('.job-companyName').innerText) {
                            item.querySelector('.job-status').innerText = rL.jobStatus;
                        }
                    }
                }
            }
            jobStatusUpdate();
            allJobCardDesign(allCardsSection);

        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
    else if (id == 'interview-filter-btn') {
        renderInterview();
        allJobCardDesign(filteredSection);
        subTotalElement.classList.remove('hidden');
        subTotalCount.innerText = interviewList.length;
        if (interviewList.length > 0) {
            allCardsSection.classList.add('hidden');
            filteredSection.classList.remove('hidden');
        } else {
            noJobsSection.classList.remove('hidden')
        }
    }
    if (id == 'rejected-filter-btn') {
        renderRejected();
        allJobCardDesign(filteredSection);
        subTotalElement.classList.remove('hidden');
        console.log(rejectedList.length);
        subTotalCount.innerText = rejectedList.length;
        if (rejectedList.length > 0) {
            allCardsSection.classList.add('hidden');
            filteredSection.classList.remove('hidden');
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
            renderRejected();

        }

        allJobCardDesign(allCardsSection);
        allJobCardDesign(filteredSection);

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
        console.log(interviewList);

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
        console.log(currentFilter);
        if (currentFilter == 'interview-filter-btn') {
            renderInterview();
        }

        allJobCardDesign(allCardsSection);
        allJobCardDesign(filteredSection);
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


function renderInterview() {
    filteredSection.innerHTML = ``;
    for (let item of interviewList) {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="p-6 bg-white rounded-lg space-y-5">
                <!-- part-1 -->
                <div class="flex justify-between">
                    <div>
                        <h3 class="job-companyName font-semibold text-lg text-[#002C5C]">${item.CompanyName}</h3>
                        <p class="job-position text-[#64748B]">${item.position}</p>
                    </div>
                    <button class="job-delete btn rounded-full w-8 h-8 p-5 hover:bg-red-200"><i
                            class="fa-regular fa-trash-can job-delete"></i></button>
                </div>
                <!-- part-2 -->
                <p class="text-[#64748B] text-[14px]">
                    <span class="job-location">${item.location}</span>
                    •
                    <span class="job-type">${item.type}</span>
                    •
                    <span class="job-salary">${item.salary}</span>
                </p>
                <!-- part-3 -->
                <div>
                    <button class="job-status font-medium text-sm text-[#002C5C] rounded-sm bg-[#EEF4FF] p-2">${item.jobStatus}</button>
                    <p class="job-description text-sm text-[#323B49] p-1">${item.description}</p>
                </div>
                <!-- part-4 -->
                <div class="space-x-2">
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div> 
        `
        filteredSection.appendChild(newDiv);
    }
}

function renderRejected() {
    filteredSection.innerHTML = ``;
    for (let item of rejectedList) {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="p-6 bg-white rounded-lg space-y-5">
                <!-- part-1 -->
                <div class="flex justify-between">
                    <div>
                        <h3 class="job-companyName font-semibold text-lg text-[#002C5C]">${item.CompanyName}</h3>
                        <p class="job-position text-[#64748B]">${item.position}</p>
                    </div>
                    <button class="job-delete btn rounded-full w-8 h-8 p-5 hover:bg-red-200"><i
                            class="fa-regular fa-trash-can job-delete"></i></button>
                </div>
                <!-- part-2 -->
                <p class="text-[#64748B] text-[14px]">
                    <span class="job-location">${item.location}</span>
                    •
                    <span class="job-type">${item.type}</span>
                    •
                    <span class="job-salary">${item.salary}</span>
                </p>
                <!-- part-3 -->
                <div>
                    <button class="job-status font-medium text-sm text-[#002C5C] rounded-sm bg-[#EEF4FF] p-2">${item.jobStatus}</button>
                    <p class="job-description text-sm text-[#323B49] p-1">${item.description}</p>
                </div>
                <!-- part-4 -->
                <div class="space-x-2">
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div> 
        `
        filteredSection.appendChild(newDiv);
    }
}


function allJobCardDesign(cardsSection) {
    const cards = cardsSection.children;
    for (let card of cards) {
        card.classList.add('border-2', 'rounded-lg', 'border-gray-300', 'border-l-6', 'hover:shadow', 'hover:shadow-blue-800');

        if (card.querySelector('.job-status').innerText == 'INTERVIEW') {
            card.querySelector('.job-status').classList.remove('bg-red-300', 'border', 'border-red-500', 'shadow-sm', 'shadow-red-500', 'bg-green-200', 'text-green-600', 'border', 'border-green-500', 'shadow-sm', 'shadow-green-500');
            card.querySelector('.job-status').classList.add('bg-green-200', 'text-green-600', 'border', 'border-green-500', 'shadow-sm', 'shadow-green-500');

            card.classList.remove('border-l-red-600', 'border-l-green-600');
            card.classList.add('border-l-green-600');


        }
        if (card.querySelector('.job-status').innerText == 'REJECTED') {
            card.querySelector('.job-status').classList.remove('bg-green-200', 'text-green-600', 'border', 'border-green-500', 'shadow-sm', 'shadow-green-500', 'bg-red-300', 'border', 'border-red-500', 'shadow-sm', 'shadow-red-500');
            card.querySelector('.job-status').classList.add('bg-red-300', 'border', 'border-red-500', 'shadow-sm', 'shadow-red-500');

            card.classList.remove('border-l-red-600', 'border-l-green-600');
            card.classList.add('border-l-red-600');
        }
    }
}
allJobCardDesign(allCardsSection);