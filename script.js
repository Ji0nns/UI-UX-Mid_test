
let opinions = [];
let likes = [];
let opinionInput = document.getElementById("opinion");
let inputMessage = document.getElementById("input-message");
let boardMessage = document.getElementById("board-message");
let opinionList = document.getElementById("opinion-list");

function showOpinions() {
    opinionList.textContent = "";
    document.getElementById("opinion-count").textContent = "등록된 의견: " + opinions.length + "개";

    if (opinions.length === 0) {
        boardMessage.textContent = "아직 의견이 없습니다. 위에서 첫 의견을 작성해 주세요.";
    }

    for (let i = 0; i < opinions.length; i++) {
        let item = document.createElement("li");
        let content = document.createElement("p");
        let likeButton = document.createElement("button");
        content.textContent = opinions[i];
        likeButton.type = "button";
        likeButton.value = i;
        likeButton.setAttribute("aria-pressed", likes[i]);

        if (likes[i] === true) {
            likeButton.textContent = "공감 취소 (1)";
            likeButton.className = "liked";
        } else {
            likeButton.textContent = "공감하기 (0)";
        }

        likeButton.addEventListener("click", changeLike);
        item.appendChild(content);
        item.appendChild(likeButton);
        opinionList.appendChild(item);
    }
}


function changeLike(event) {
    let number = Number(event.currentTarget.value);

    if (likes[number] === false) {
        likes[number] = true;
        boardMessage.textContent = (number + 1) + "번째 의견에 공감했습니다. 다시 누르면 취소됩니다.";
    } else {
        likes[number] = false;
        boardMessage.textContent = (number + 1) + "번째 의견의 공감을 취소했습니다. 다른 의견도 확인해 보세요.";
    }

    showOpinions();

    opinionList.children[number].querySelector("button").focus();
}


document.getElementById("opinion-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let text = opinionInput.value.trim();
    inputMessage.className = "error";

    if (text === "") {
        inputMessage.textContent = "의견이 비어 있습니다. 학교생활에 관한 의견을 입력해 주세요.";
        opinionInput.focus();
        return;
    }
    if (text.length < 5 || text.length > 100) {
        inputMessage.textContent = "의견은 5~100자로 입력해 주세요. 현재 " + text.length + "자입니다.";
        opinionInput.focus();
        return;
    }
    for (let i = 0; i < opinions.length; i++) {
        if (opinions[i] === text) {
            inputMessage.textContent = "이미 등록한 의견입니다. 다른 의견을 적거나 게시판에서 공감해 주세요.";
            opinionInput.focus();
            return;
        }
    }

    opinions.push(text);
    likes.push(false);
    showOpinions();
    inputMessage.className = "success";
    inputMessage.textContent = "의견을 등록했습니다. 아래 게시판에서 확인하고 공감해 보세요.";
    boardMessage.textContent = "새 의견이 추가되었습니다. 공감하는 의견의 버튼을 눌러 주세요.";
    opinionInput.value = "";
});


document.getElementById("restart").addEventListener("click", function() {
    opinions = [];
    likes = [];
    opinionInput.value = "";
    inputMessage.textContent = "의견을. 새 의견을 작성해 주세요.";
    inputMessage.className = "success";
    showOpinions();
    opinionInput.focus();
});


let schoolImage = document.getElementById("school-image");
function showImageNotice() {
    schoolImage.hidden = true;
    document.getElementById("image-notice").hidden = false;
}
schoolImage.addEventListener("error", showImageNotice);
if (schoolImage.complete && schoolImage.naturalWidth === 0) {
    showImageNotice();
}
showOpinions();
