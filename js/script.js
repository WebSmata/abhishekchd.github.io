const STATE_JSON = {
    projects: [
        {
            "name": "Deep Learning",
            "category": ["Python", "PyTorch"],
            "description": "Exercises from <b>Intro to Deep Learning with PyTorch</b> by Udacity which I received as a scholarship to compete for complete Deep Learning Nanodegree.",
            "links": {
                "github": "https://github.com/AbhishekChd/DeepLearning",
            },
            "image": "./img/deep-learning-pytorch.png"
        },
        {
            "name": "News App",
            "category": ["Android"],
            "description": "Latest News Headlines from different categories - Business,Technology and more! Save the news you like and view anytime.",
            "links": {
                "github": "https://github.com/AbhishekChd/NewsApp",
            },
            "image": "./img/news.png"
        },
        {
            "name": "Cineverse",
            "category": ["Android"],
            "description": "See Latest Popular and Top Rated movies, and their synopsis, trailers and ratings. Save the movies you like and see later!",
            "links": {
                "github": "https://github.com/AbhishekChd/Cineverse",
            },
            "image": "./img/cineverse.png"
        },
        {
            "name": "Sudoku Solver",
            "category": ["Python", "AI"],
            "description": "Solve upto hard problems by inputting a problem in String format replacing empty boxes with <code>`.`</code> Made as part of Udacity's Project in AI Nanodegree Preview",
            "links": {
                "github": "https://github.com/AbhishekChd/Sudoku-Solver",
            },
            "image": "img/sudoku.png"
        },
        {
            "name": "FreeCodeCamp Projects",
            "category": ["Web", "JavaScript"],
            "description": "Major Projects made as part of <b>FreeCodeCamp</b> like TicTacToe, Wikipedia Viewer.",
            "links": {
                "github": "https://github.com/AbhishekChd/FreeCodeCampProjects",
                "website": "https://abhishekchd.github.io/FreeCodeCampProjects/"
            },
            "image": "img/fcc-projects.png"
        }
    ],
    skills: [
        {title: 'Java', level: 80},
        {title: 'Android', level: 90},
        {title: 'Python', level: 80},
        {title: 'C++', level: 65},
        {title: 'JavaScript', level: 80},
        {title: 'SQL', level: 90},
        {title: 'HTML/CSS', level: 80},
        {title: 'PyTorch', level: 55}

    ]
};

function renderSkill(skill) {
    const rotate = 180 + (18 / 5 * (skill.level - 50));
    return `<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                <div class="skill-wrapper my-3">
                    <span class="label">${skill.level}%<br><small>${skill.title}</small></span>
                    <div class="skill-circle">
                        <div class="left-side half-circle"></div>
                        <div class="right-side half-circle" style="transform: rotate(${rotate}deg);-webkit-transform: rotate(${rotate});"></div>
                    </div>
                    <div class="shadow"></div>
                </div>
            </div>`;
}

function renderProjectLinks(item) {
    let links = '';
    if (item.links.hasOwnProperty('website')) {
        links += `<a class="text-black-50 mx-3" href="${item.links.website}" target="_blank">
                    <i class="fas fa-globe fa-2x move"></i>
                </a>`;
    }
    if (item.links.hasOwnProperty('github')) {
        links += `<a class="text-black-50 mx-3" href="${item.links.github}" target="_blank">
                    <i class="fab fa-2x fa-github move"></i>
                </a>`;
    }
    return links;
}

function renderProjects(item, i, dark = true) {
    const bg_color = dark ? 'bg-dark text-white' : '';
    const btn_back = dark ? 'btn-secondary' : 'btn-outline-primary';

    return `<div class="col-sm-6 col-md-4 col-xl-3 mt-3 mb-3">
            <div class="card ${bg_color} card-back">
                <div class="card-body d-flex flex-column align-items-center justify-content-center">
                    <h2 class="text-uppercase font-weight-bold text-center" style="letter-spacing: 1px">${item.name}</h2>
                    <h4>${renderBadges(item)}</h4>
                    <div class="btn ${btn_back} btn-lg mt-5 font-weight-bold" onclick="renderItemClick(${i})">Details</div>
                </div>
            </div>
        </div>`;
}

function renderItemClick(index) {
    const item = STATE_JSON.projects[index];
    const modal =
        `<div class="modal fade" id="projectModal" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header d-flex align-items-center">
                        <div>
                            <h3 class="modal-title">${item.name}</h3>
                            <h5>${renderBadges(item)}</h5>
                        </div>
                        <div>${renderProjectLinks(item)}</div>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12 col-sm-6 col-md-7 col-lg-8">
                                <p id="model-text">${item.description}</p>
                            </div>
                            <div class="col-xs-6 col-sm-6 col-md-5 col-lg-4">
                                <img class="img-fluid img-thumbnail" style="max-height: 100vh;"  src="${item.image}" alt="${item.name} cover"/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
    $('#model-root').html(modal);
    $('#projectModal').modal().show();
}

function renderBadges(item) {
    return item.category.map(value => {
        return `<span class="badge badge-primary badge-pill mr-2">${value}</span>`;
    }).join('');
}

$(() => {
    // Load Projects
    $("#projects-root").html(STATE_JSON.projects.map((value, i) => {
        return renderProjects(value, i)
    }).join(''));

    // Load skills - increasing level order
    const sorted_skills = STATE_JSON.skills.sort((a, b) => b.level - a.level);
    $('.charts-container').html(sorted_skills.map((value, i) => {
        return renderSkill(value, i);
    }).join(''));

    // Collapse Navbar on click
    $('.navbar-collapse a').click(function () {
        $(".navbar-collapse").collapse('hide');
    });


    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            $('html').animate({
                scrollTop: $(this.hash).offset().top - $('nav.navbar').innerHeight()
            }, 1000);
        } // End if
    });
});