(function () {
  var C = window.SITE, $ = function (i) { return document.getElementById(i); };
  var home = $("home"), page = $("page"), stage = $("stage"), audio = $("audio"), last = null, busy = false, by = {};
  C.sections.forEach(function (s) { by[s.id] = s; });
  $("avatar").src = C.avatar; $("name").textContent = "Hi, I'm " + C.name; $("tagline").textContent = C.tagline;
  document.title = C.name;
  var mediaP = fetch("media.json", { cache: "no-cache" }).then(function (r) { return r.json(); }).catch(function () { return {}; });
  function ico(id) { return '<svg viewBox="0 0 100 100"><use href="icons.svg#' + id + '"/></svg>'; }
  function nm(x) { return decodeURIComponent(x.split("/").pop()).replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "); }

  $("objs").innerHTML = C.sections.map(function (s, i) {
    return '<a class="obj" href="#/' + s.id + '" style="--x:' + s.x + '%;--y:' + s.y + '%;--d:' + (i * 0.4) + 's">' + ico(s.icon) + '<span>' + s.title + '</span></a>';
  }).join("");

  // Travel effect: the scene slides and zooms toward the clicked object, then the page fades in.
  function pose(k) {
    var s = by[k], w = stage.offsetWidth, h = stage.offsetHeight, z = 3.2;
    return "translate(" + (w / 2 - z * s.x / 100 * w) + "px," + (h / 2 - z * s.y / 100 * h) + "px) scale(" + z + ")";
  }
  $("objs").addEventListener("click", function (e) {
    var a = e.target.closest(".obj"); if (!a || busy) return;
    e.preventDefault(); busy = true;
    var k = a.getAttribute("href").slice(2);
    stage.classList.add("go"); stage.style.transform = pose(k);
    setTimeout(function () { location.hash = "#/" + k; }, 850);
  });

  function bar(k) {
    return '<div class="bar"><a class="home" href="#/" aria-label="Home"><img src="' + C.avatar + '" alt=""></a>' +
      C.sections.map(function (s) { return '<a href="#/' + s.id + '" class="' + (s.id === k ? "on" : "") + '">' + ico(s.icon) + s.title + '</a>'; }).join("") + '</div>';
  }
  function pick(list, prefix) { return (list || []).filter(function (x) { return x.indexOf(prefix) === 0; }); }
  function enhance(m) {
    page.querySelectorAll("[data-gallery]").forEach(function (el) {
      var p = el.dataset.gallery, f = pick(m.images, p);
      el.className = "gallery";
      el.innerHTML = f.length ? f.map(function (x) { return '<img loading="lazy" src="' + x + '" alt="' + nm(x) + '">'; }).join("")
        : '<p class="txt">Add images to <code>' + p + '</code>, then run <code>python3 tools/scan.py</code>.</p>';
    });
    page.querySelectorAll("[data-playlist]").forEach(function (el) {
      var p = el.dataset.playlist, f = pick(m.music, p);
      el.innerHTML = f.length ? '<ul class="tracks">' + f.map(function (x) { return '<li data-src="' + x + '">▶ ' + nm(x) + '</li>'; }).join("") + '</ul>'
        : '<p class="txt">Add audio files to <code>' + p + '</code>, then run <code>python3 tools/scan.py</code>.</p>';
    });
  }

  function render() {
    var k = location.hash.replace("#/", "");
    if (!by[k]) {
      page.classList.remove("in"); document.title = C.name; busy = false;
      if (last) {
        stage.classList.remove("go"); stage.style.transform = pose(last); void stage.offsetWidth;
        home.classList.remove("out"); stage.classList.add("go"); stage.style.transform = "none";
      } else { home.classList.remove("out"); }
      last = null; return;
    }
    var s = by[k];
    var frag = fetch("pages/" + k + ".html", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.text() : '<p class="txt">Create <code>pages/' + k + '.html</code> to fill this page.</p>'; })
      .catch(function () { return '<p class="txt">Could not load this page. Open the site through a local server (see README).</p>'; });
    Promise.all([frag, mediaP]).then(function (a) {
      if (location.hash !== "#/" + k) return;
      page.innerHTML = bar(k) + '<main><h2>' + s.title + '</h2><p class="sub">' + (s.sub || "") + '</p>' + a[0] + '</main>';
      page.scrollTop = 0; document.title = s.title + " · " + C.name; enhance(a[1]);
      last = k; home.classList.add("out"); page.classList.add("in");
    });
  }

  page.addEventListener("click", function (e) {
    var li = e.target.closest(".tracks li");
    if (li) { audio.src = li.dataset.src; audio.play(); $("player").hidden = false; $("now").textContent = nm(li.dataset.src); return; }
    var im = e.target.closest(".gallery img");
    if (im) { var lb = document.createElement("div"); lb.className = "lb"; lb.innerHTML = '<img src="' + im.src + '" alt="">'; lb.onclick = function () { lb.remove(); }; document.body.appendChild(lb); }
  });
  $("pp").onclick = function () { audio.paused ? audio.play() : audio.pause(); };
  audio.onplay = function () { $("pp").textContent = "❚❚"; };
  audio.onpause = function () { $("pp").textContent = "▶"; };
  addEventListener("hashchange", render); render();
})();
