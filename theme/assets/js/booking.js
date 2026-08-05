window.ppsOnlineBooking = function() {
    new OnlineBooking({
        container: "ob-container",
        id: 556289
    });
};

(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ob.rushcliff.com/status-check", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.responseText === "live") {
                const s = document.createElement("script");
                s.src = "https://ob.rushcliff.com/js/obv4.js";
                document.head.appendChild(s);
            } else {
                const el = document.getElementById("ob-container");
                if (el) {
                    el.innerHTML = "<p>Our online booking service is currently unavailable. Please call, email or try again later.</p>";
                }
            }
        }
    };
    xhr.send();
})();
