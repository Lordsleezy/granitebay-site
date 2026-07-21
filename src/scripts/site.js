(function () {
  "use strict";

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * clamp(t, 0, 1);
  }

  function easeOutBack(t) {
    var c1 = 1.70158;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function initHeroCanvas() {
    var hero = document.getElementById("hero");
    var canvas = document.getElementById("hero-canvas");
    if (!hero || !canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var dpr = 1;
    var width = 0;
    var height = 0;
    var scale = 1;
    var groundY = 0;
    var fenceY = 0;
    var fencePieces = [];
    var collapsePieces = [];
    var birds = [];
    var clouds = [];
    var tears = [];
    var highFiveParticles = [];
    var dustClouds = [];
    var rafId = null;
    var lastFrame = 0;
    var paused = document.hidden;
    var stateStartTime = performance.now();
    var currentState = "BUILDING";
    var buildProgress = 0;
    var highFiveTriggered = false;
    var collapseStarted = false;

    var STATES = {
      BUILDING: { duration: 45000 },
      HIGHFIVE: { duration: 3000 },
      COLLAPSE: { duration: 2000 },
      SAD: { duration: 4000 },
      RESET: { duration: 800 }
    };

    function resizeCanvas() {
      var rect = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(320, Math.round(rect.width));
      height = Math.max(480, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      scale = width / 1200;
      groundY = height * 0.62;
      fenceY = groundY - 10 * scale;
      createFencePieces();
      createAmbient();
    }

    function createAmbient() {
      birds = [
        { x: width * 0.18, y: height * 0.16, speed: 0.3, size: 11 },
        { x: width * 0.46, y: height * 0.12, speed: 0.24, size: 8 },
        { x: width * 0.72, y: height * 0.2, speed: 0.34, size: 10 }
      ];
      clouds = [
        { x: width * 0.17, y: height * 0.16, s: 1.1 },
        { x: width * 0.55, y: height * 0.13, s: 0.85 },
        { x: width * 0.77, y: height * 0.22, s: 1 }
      ];
    }

    function createFencePieces() {
      fencePieces = [];
      var postSpacing = 80 * scale;
      var postW = 14 * scale;
      var postH = 90 * scale;
      var picketW = 10 * scale;
      var picketH = 75 * scale;
      var railH = 8 * scale;
      var startX = -postSpacing * 0.5;
      var postCount = Math.ceil((width + postSpacing) / postSpacing) + 1;

      for (var i = 0; i < postCount; i++) {
        var x = startX + i * postSpacing;
        var postIndex = clamp((x + postSpacing * 0.5) / (width + postSpacing), 0, 1);
        fencePieces.push({ kind: "post", x: x, y: fenceY - postH, w: postW, h: postH, color: "#8B5E3C", trigger: postIndex });

        if (i < postCount - 1) {
          var nextX = x + postSpacing;
          [0.3, 0.65].forEach(function (railRatio, railIndex) {
            fencePieces.push({
              kind: "rail",
              x: x + postW * 0.5,
              y: fenceY - postH * railRatio,
              w: nextX - x,
              h: railH,
              color: "#7A4F32",
              trigger: clamp((x + postSpacing * 0.65 + railIndex * 8 * scale) / (width + postSpacing), 0, 1)
            });
          });
          for (var p = 1; p <= 4; p++) {
            var px = x + p * (postSpacing / 5) - picketW * 0.5;
            fencePieces.push({
              kind: "picket",
              x: px,
              y: fenceY - picketH,
              w: picketW,
              h: picketH,
              color: "#A67C52",
              trigger: clamp((px + postSpacing * 0.5) / (width + postSpacing), 0, 1)
            });
          }
        }
      }
    }

    function roundedRect(x, y, w, h, r) {
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
      }
    }

    function fillRoundRect(x, y, w, h, r, color) {
      ctx.beginPath();
      roundedRect(x, y, w, h, r);
      ctx.fillStyle = color;
      ctx.fill();
    }

    function drawBackground() {
      var gradient = ctx.createLinearGradient(0, 0, 0, groundY);
      gradient.addColorStop(0, "#87CEEB");
      gradient.addColorStop(0.52, "#c8e6f0");
      gradient.addColorStop(1, "#e8d5a0");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      var sunX = width * 0.85;
      var sunY = 80 * scale;
      [65, 85, 105].forEach(function (r) {
        ctx.beginPath();
        ctx.arc(sunX, sunY, r * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,220,80,0.08)";
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(sunX, sunY, 45 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#ffe16a";
      ctx.fill();

      clouds.forEach(drawCloud);
      drawBirds();

      ctx.fillStyle = "#4a8c3f";
      ctx.fillRect(0, groundY, width, height - groundY);
      ctx.strokeStyle = "rgba(0,0,0,0.04)";
      ctx.lineWidth = 1;
      for (var y = groundY; y < height; y += 8 * scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function drawCloud(cloud) {
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.scale(cloud.s * scale, cloud.s * scale);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      [[0, 4, 48, 24], [34, -5, 64, 32], [78, 6, 52, 25]].forEach(function (e) {
        ctx.beginPath();
        ctx.ellipse(e[0], e[1], e[2], e[3], 0, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    function drawBirds() {
      ctx.strokeStyle = "rgba(40,60,80,0.45)";
      ctx.lineWidth = Math.max(1.4, 2 * scale);
      birds.forEach(function (bird) {
        bird.x += bird.speed;
        if (bird.x > width + 30) bird.x = -30;
        var s = bird.size * scale;
        ctx.beginPath();
        ctx.moveTo(bird.x - s, bird.y);
        ctx.quadraticCurveTo(bird.x - s * 0.5, bird.y - s * 0.55, bird.x, bird.y);
        ctx.quadraticCurveTo(bird.x + s * 0.5, bird.y - s * 0.55, bird.x + s, bird.y);
        ctx.stroke();
      });
    }

    function drawHouse() {
      var houseW = width * 0.35;
      var houseH = height * 0.28;
      var x = width / 2 - houseW / 2;
      var y = groundY - houseH;
      var garageW = houseW * 0.4;
      var garageH = houseH * 0.65;

      drawTrees(x, y, houseW);

      ctx.fillStyle = "#8B6355";
      ctx.fillRect(x + houseW * 0.68, y - 54 * scale, 26 * scale, 58 * scale);

      ctx.beginPath();
      ctx.moveTo(x - 20 * scale, y + 8 * scale);
      ctx.lineTo(x + houseW / 2, y - 60 * scale);
      ctx.lineTo(x + houseW + 20 * scale, y + 8 * scale);
      ctx.closePath();
      ctx.fillStyle = "#8B4513";
      ctx.fill();
      ctx.fillStyle = "#6d3511";
      ctx.fillRect(x - 11 * scale, y + 2 * scale, houseW + 22 * scale, 10 * scale);

      ctx.fillStyle = "#e8d4b8";
      ctx.fillRect(x, y, houseW, houseH);
      ctx.fillStyle = "#d4c4a8";
      ctx.fillRect(x + houseW * 0.73, groundY - garageH, garageW, garageH);
      ctx.fillStyle = "#b6a588";
      ctx.fillRect(x + houseW * 0.77, groundY - garageH * 0.82, garageW * 0.84, garageH * 0.72);
      ctx.strokeStyle = "rgba(80,60,40,0.32)";
      ctx.lineWidth = 2 * scale;
      for (var gy = groundY - garageH * 0.7; gy < groundY - 12 * scale; gy += 14 * scale) {
        ctx.beginPath();
        ctx.moveTo(x + houseW * 0.78, gy);
        ctx.lineTo(x + houseW * 0.73 + garageW * 0.92, gy);
        ctx.stroke();
      }

      var doorW = houseW * 0.15;
      var doorH = houseH * 0.4;
      ctx.fillStyle = "#6B3A2A";
      ctx.fillRect(width / 2 - doorW / 2, groundY - doorH, doorW, doorH);
      ctx.beginPath();
      ctx.arc(width / 2 + doorW * 0.28, groundY - doorH * 0.5, 4 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#d4a853";
      ctx.fill();

      drawWindow(x + houseW * 0.16, y + houseH * 0.32, houseW * 0.18, houseH * 0.22);
      drawWindow(x + houseW * 0.54, y + houseH * 0.32, houseW * 0.18, houseH * 0.22);
    }

    function drawWindow(x, y, w, h) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(x - 4 * scale, y - 4 * scale, w + 8 * scale, h + 8 * scale);
      ctx.fillStyle = "#a8d4f0";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w / 2, y + h);
      ctx.moveTo(x, y + h / 2);
      ctx.lineTo(x + w, y + h / 2);
      ctx.stroke();
    }

    function drawTrees(houseX, houseY, houseW) {
      [
        { x: houseX - 90 * scale, y: houseY + 20 * scale, s: 1.1 },
        { x: houseX + houseW + 74 * scale, y: houseY + 32 * scale, s: 0.95 }
      ].forEach(function (tree) {
        ctx.fillStyle = "#6d431c";
        ctx.fillRect(tree.x - 8 * scale, tree.y + 54 * scale, 16 * scale, 95 * scale);
        ctx.fillStyle = "rgba(45,106,45,0.82)";
        [[0, 0, 45], [-28, 18, 34], [30, 20, 36]].forEach(function (c) {
          ctx.beginPath();
          ctx.arc(tree.x + c[0] * scale, tree.y + c[1] * scale, c[2] * tree.s * scale, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    function drawFencePiece(piece, popScale, alpha, rotation) {
      ctx.save();
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
      ctx.rotate(rotation || 0);
      ctx.scale(popScale, popScale);
      ctx.translate(-piece.w / 2, -piece.h / 2);
      ctx.fillStyle = piece.color;
      if (piece.kind === "post") {
        fillRoundRect(0, 0, piece.w, piece.h, 5 * scale, piece.color);
        ctx.fillStyle = "#7d5134";
        ctx.fillRect(-2 * scale, 8 * scale, piece.w + 4 * scale, 8 * scale);
      } else if (piece.kind === "picket") {
        ctx.beginPath();
        ctx.moveTo(piece.w / 2, -12 * scale);
        ctx.lineTo(piece.w, 0);
        ctx.lineTo(piece.w, piece.h);
        ctx.lineTo(0, piece.h);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        fillRoundRect(0, 0, piece.w, piece.h, 2 * scale, piece.color);
      }
      ctx.restore();
    }

    function drawFence(state, stateProgress) {
      if (state === "COLLAPSE" || state === "SAD") {
        collapsePieces.forEach(function (piece) {
          drawFencePiece(piece, 1, piece.alpha, piece.rotation);
        });
        return;
      }

      var progress = state === "BUILDING" ? buildProgress : 1;
      fencePieces.forEach(function (piece) {
        var local = (progress - piece.trigger) / 0.035;
        if (local <= 0) return;
        drawFencePiece(piece, Math.min(1.12, easeOutBack(clamp(local, 0, 1))), 1, 0);
      });
    }

    function drawBushes() {
      var spots = [width * 0.18, width * 0.48, width * 0.78];
      spots.forEach(function (x, index) {
        ctx.fillStyle = "#3a7a3a";
        [0, 1, 2].forEach(function (part) {
          ctx.beginPath();
          ctx.arc(x + (part - 1) * 20 * scale, fenceY - (8 + part * 2) * scale, (18 + index * 3 + part * 2) * scale, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    function drawToolboxAndPlanks() {
      var x = 70 * scale;
      var y = groundY + 22 * scale;
      fillRoundRect(x, y, 50 * scale, 30 * scale, 5 * scale, "#CC8800");
      ctx.save();
      ctx.translate(x + 8 * scale, y - 2 * scale);
      ctx.rotate(-0.17);
      fillRoundRect(0, 0, 48 * scale, 9 * scale, 3 * scale, "#a96f00");
      ctx.restore();
      ctx.fillStyle = "#666";
      ctx.fillRect(x + 12 * scale, y - 10 * scale, 5 * scale, 14 * scale);
      ctx.fillStyle = "#5c3a1e";
      ctx.fillRect(x + 31 * scale, y - 8 * scale, 17 * scale, 4 * scale);

      var pileX = 140 * scale;
      var planks = Math.max(0, 5 - Math.floor(buildProgress * 5.5));
      for (var i = 0; i < planks; i++) {
        ctx.save();
        ctx.translate(pileX + (i % 2) * 8 * scale, y + 34 * scale - i * 8 * scale);
        ctx.rotate((i - 2) * 0.04);
        fillRoundRect(0, 0, 70 * scale, 8 * scale, 2 * scale, i % 2 ? "#7A4F32" : "#8B5E3C");
        ctx.restore();
      }
    }

    function drawWorker(opts) {
      var x = opts.x;
      var y = opts.y;
      var shirt = opts.shirt;
      var hat = opts.hat;
      var state = opts.state;
      var t = opts.t;
      var facing = opts.facing || 1;
      var happy = state === "HIGHFIVE";
      var sad = state === "SAD";
      var working = state === "BUILDING";
      var stumble = state === "COLLAPSE";
      var jump = happy ? Math.sin(t * Math.PI * 4) * 8 * scale : 0;
      var headTilt = sad ? 0.35 : stumble ? -0.25 : 0;
      var walk = working || state === "RESET";
      var legSwing = walk ? Math.sin(t * Math.PI * 3) * 0.35 : 0;
      var hammerSwing = working ? Math.sin(t * Math.PI * 6) * 0.65 : 0;
      var armFlail = stumble ? Math.sin(t * Math.PI * 10) * 0.8 : 0;

      ctx.save();
      ctx.translate(x, y + jump);
      ctx.scale(facing, 1);
      ctx.shadowBlur = 8 * scale;
      ctx.shadowColor = "rgba(0,0,0,0.15)";

      function limb(px, py, w, h, angle, color) {
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle);
        fillRoundRect(-w / 2, 0, w, h, w / 2, color);
        ctx.restore();
      }

      limb(-8 * scale, 38 * scale, 11 * scale, 32 * scale, legSwing, "#1a1a6e");
      limb(10 * scale, 38 * scale, 11 * scale, 32 * scale, -legSwing, "#1a1a6e");
      fillRoundRect(-20 * scale, 67 * scale, 22 * scale, 8 * scale, 4 * scale, "#2c1a0a");
      fillRoundRect(2 * scale, 67 * scale, 22 * scale, 8 * scale, 4 * scale, "#2c1a0a");

      fillRoundRect(-14 * scale, -2 * scale, 28 * scale, 38 * scale, 8 * scale, shirt);
      ctx.fillStyle = "#8B6914";
      ctx.fillRect(-16 * scale, 25 * scale, 32 * scale, 5 * scale);
      ctx.fillRect(-12 * scale, 29 * scale, 7 * scale, 8 * scale);
      ctx.fillRect(6 * scale, 29 * scale, 7 * scale, 8 * scale);

      var leftArmAngle = opts.assistant && working ? -1.05 + Math.sin(t * Math.PI * 2) * 0.18 : 0.2;
      var rightArmAngle = working && !opts.assistant ? -0.5 + hammerSwing : 0.35;
      if (happy) {
        leftArmAngle = opts.assistant ? -1.35 : 0.25;
        rightArmAngle = opts.assistant ? 0.25 : -1.35;
      }
      if (stumble) {
        leftArmAngle = -1.2 + armFlail;
        rightArmAngle = 1.1 - armFlail;
      }
      if (sad) {
        leftArmAngle = 0.25;
        rightArmAngle = -0.25;
      }
      limb(-18 * scale, 5 * scale, 10 * scale, 30 * scale, leftArmAngle, shirt);
      limb(18 * scale, 5 * scale, 10 * scale, 30 * scale, rightArmAngle, shirt);

      if (working && !opts.assistant) {
        ctx.save();
        ctx.translate(30 * scale, 3 * scale);
        ctx.rotate(-0.6 + hammerSwing);
        ctx.fillStyle = "#5c3a1e";
        ctx.fillRect(0, 0, 14 * scale, 3 * scale);
        ctx.fillStyle = "#666";
        ctx.fillRect(11 * scale, -3 * scale, 8 * scale, 6 * scale);
        ctx.restore();
      }
      if (opts.assistant && working) {
        ctx.save();
        ctx.translate(-38 * scale, 3 * scale);
        ctx.rotate(-0.25 + Math.sin(t * Math.PI * 2) * 0.12);
        fillRoundRect(0, 0, 10 * scale, 62 * scale, 2 * scale, "#A67C52");
        ctx.restore();
      }

      ctx.save();
      ctx.translate(0, -25 * scale);
      ctx.rotate(headTilt);
      ctx.fillStyle = "#FFCC99";
      ctx.beginPath();
      ctx.arc(0, 0, 18 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hat;
      ctx.beginPath();
      ctx.ellipse(0, -17 * scale, 17 * scale, 8 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -11 * scale, 22 * scale, 5 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(70,45,0,0.45)";
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(-13 * scale, -13 * scale);
      ctx.lineTo(13 * scale, -13 * scale);
      ctx.stroke();
      drawFace(happy, sad);
      ctx.restore();

      ctx.restore();
    }

    function drawFace(happy, sad) {
      ctx.strokeStyle = "#333";
      ctx.fillStyle = "#333";
      ctx.lineWidth = 1.8 * scale;
      if (happy || sad) {
        [-7, 7].forEach(function (ex) {
          ctx.beginPath();
          ctx.arc(ex * scale, -1 * scale, 4 * scale, happy ? Math.PI : 0, happy ? Math.PI * 2 : Math.PI);
          ctx.stroke();
        });
      } else {
        [-7, 7].forEach(function (ex) {
          ctx.beginPath();
          ctx.arc(ex * scale, -1 * scale, 2 * scale, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      ctx.beginPath();
      if (sad) {
        ctx.arc(0, 12 * scale, 7 * scale, Math.PI * 1.15, Math.PI * 1.85);
      } else {
        ctx.arc(0, 6 * scale, happy ? 9 * scale : 5 * scale, 0.15 * Math.PI, 0.85 * Math.PI);
      }
      ctx.stroke();
    }

    function workerPositions(state, stateProgress, time) {
      var start = 95 * scale;
      var fenceWidth = width - 170 * scale;
      var x1 = start + buildProgress * fenceWidth - 60 * scale;
      var x2 = x1 + 70 * scale;
      if (state === "HIGHFIVE") {
        x1 = lerp(width * 0.42, width * 0.49, stateProgress);
        x2 = lerp(width * 0.58, width * 0.51, stateProgress);
      } else if (state === "COLLAPSE") {
        x1 = width * 0.46 - 20 * scale * stateProgress;
        x2 = width * 0.54 + 20 * scale * stateProgress;
      } else if (state === "SAD") {
        x1 = width * 0.45;
        x2 = width * 0.55;
      } else if (state === "RESET") {
        x1 = lerp(width * 0.45, start - 60 * scale, stateProgress);
        x2 = lerp(width * 0.55, start + 10 * scale, stateProgress);
      }
      return { x1: x1, x2: x2, y: groundY - 85 * scale };
    }

    function triggerHighFive(point) {
      highFiveParticles = [];
      for (var i = 0; i < 6; i++) {
        var angle = (Math.PI * 2 / 6) * i + Math.random() * 0.3;
        highFiveParticles.push({
          x: point.x,
          y: point.y,
          vx: Math.cos(angle) * 2 * scale,
          vy: Math.sin(angle) * 2 * scale,
          life: 30
        });
      }
    }

    function drawHighFiveEffects(point, stateProgress) {
      var frame = stateProgress * 180;
      if (frame > 45 && frame < 75) {
        var alpha = 1 - (frame - 45) / 30;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 3 * scale;
        for (var i = 0; i < 8; i++) {
          var angle = i * Math.PI / 4;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(point.x + Math.cos(angle) * 20 * scale, point.y + Math.sin(angle) * 20 * scale);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(point.x, point.y, 20 * scale * alpha, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fill();
        ctx.restore();
      }
      highFiveParticles.forEach(function (particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;
        ctx.globalAlpha = clamp(particle.life / 30, 0, 1);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,215,0,0.9)";
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function startCollapse() {
      collapsePieces = fencePieces.map(function (piece) {
        return Object.assign({}, piece, {
          vx: (Math.random() * 8 - 4) * scale,
          vy: (-8 + Math.random() * 6) * scale,
          rotSpeed: Math.random() * 0.3 - 0.15,
          rotation: 0,
          alpha: 1
        });
      });
      dustClouds = [0, 1, 2, 3, 4].map(function (i) {
        return { x: width * (0.25 + i * 0.13), y: fenceY + 8 * scale, r: 5 * scale, alpha: 0.6 };
      });
    }

    function updateCollapse() {
      collapsePieces.forEach(function (piece) {
        piece.vy += 0.35 * scale;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.rotSpeed;
        piece.alpha = Math.max(0, piece.alpha - 0.02);
      });
      dustClouds.forEach(function (dust) {
        dust.r += 1.35 * scale;
        dust.alpha = Math.max(0, dust.alpha - 0.02);
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180,140,100," + dust.alpha + ")";
        ctx.fill();
      });
    }

    function drawTears(x, y) {
      if (Math.random() < 0.04) {
        tears.push({ x: x - 8 * scale, y: y - 101 * scale, vy: 0.5 * scale, alpha: 1 });
      }
      tears.forEach(function (tear) {
        tear.vy += 0.3 * scale;
        tear.y += tear.vy;
        tear.alpha -= 0.015;
        ctx.save();
        ctx.globalAlpha = Math.max(0, tear.alpha);
        ctx.fillStyle = "#6db7ff";
        ctx.beginPath();
        ctx.ellipse(tear.x, tear.y, 3 * scale, 6 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      tears = tears.filter(function (tear) {
        return tear.alpha > 0 && tear.y < height;
      });
    }

    function drawScene(state, stateProgress, time) {
      drawBackground();
      drawHouse();
      drawToolboxAndPlanks();
      drawBushes();
      if (state === "COLLAPSE") updateCollapse();
      drawFence(state, stateProgress);

      var positions = workerPositions(state, stateProgress, time);
      var facingOne = state === "HIGHFIVE" ? 1 : 1;
      var facingTwo = state === "HIGHFIVE" ? -1 : 1;
      drawWorker({ x: positions.x1, y: positions.y, shirt: "#2244AA", hat: "#FFD700", state: state, t: time, facing: facingOne, assistant: false });
      drawWorker({ x: positions.x2, y: positions.y + 4 * scale, shirt: "#AA2222", hat: "#FF6600", state: state, t: time, facing: facingTwo, assistant: true });

      if (state === "HIGHFIVE") {
        var impact = { x: width * 0.5, y: positions.y - 54 * scale };
        if (!highFiveTriggered && stateProgress > 0.25) {
          highFiveTriggered = true;
          triggerHighFive(impact);
        }
        drawHighFiveEffects(impact, stateProgress);
      }
      if (state === "SAD") {
        drawTears(positions.x1, positions.y);
        drawTears(positions.x2, positions.y);
      }

      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, width, height);
    }

    function advanceState() {
      if (currentState === "BUILDING") {
        buildProgress = 1;
        currentState = "HIGHFIVE";
        highFiveTriggered = false;
      } else if (currentState === "HIGHFIVE") {
        currentState = "COLLAPSE";
        collapseStarted = false;
      } else if (currentState === "COLLAPSE") {
        currentState = "SAD";
      } else if (currentState === "SAD") {
        currentState = "RESET";
      } else {
        currentState = "BUILDING";
        buildProgress = 0;
        collapsePieces = [];
        highFiveParticles = [];
        tears = [];
      }
      stateStartTime = performance.now();
    }

    function loop(now) {
      if (paused) return;
      rafId = requestAnimationFrame(loop);
      if (now - lastFrame < 1000 / 60) return;
      lastFrame = now;

      var elapsed = now - stateStartTime;
      var stateDuration = STATES[currentState].duration;
      var stateProgress = Math.min(elapsed / stateDuration, 1);
      if (stateProgress >= 1) {
        advanceState();
        stateProgress = 0;
      }
      if (currentState === "BUILDING") {
        buildProgress = stateProgress;
      } else if (currentState === "COLLAPSE" && !collapseStarted) {
        collapseStarted = true;
        startCollapse();
      }
      drawScene(currentState, stateProgress, now / 1000);
    }

    function start() {
      if (rafId || paused) return;
      rafId = requestAnimationFrame(loop);
    }

    function stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    var heroVisible = true;

    function setPaused(nextPaused) {
      paused = nextPaused;
      if (paused) stop();
      else {
        lastFrame = performance.now();
        stateStartTime = performance.now() - Math.min(STATES[currentState].duration - 1, STATES[currentState].duration * buildProgress);
        start();
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", function () {
      setPaused(document.hidden || !heroVisible);
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        setPaused(document.hidden || !heroVisible);
      }, { threshold: 0.08 }).observe(hero);
    }
    setPaused(document.hidden || !heroVisible);
  }

  function initGsap() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ limitCallbacks: true });
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set("main > section", { clearProps: "all", autoAlpha: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    gsap.fromTo(".hero-inner > *", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out" });
    gsap.to(".scroll-line", { height: 50, duration: 0.9, ease: "power2.out", delay: 0.3 });

    gsap.utils.toArray("main > section:not(#hero)").forEach(function (section) {
      gsap.fromTo(section, { autoAlpha: 0, y: 36 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true
        }
      });
    });
  }

  function initCounters() {
    var counters = Array.prototype.slice.call(document.querySelectorAll(".stat-number[data-count]"));
    if (!counters.length) return;
    var seen = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || seen) return;
        seen = true;
        counters.forEach(function (counter) {
          var target = parseInt(counter.dataset.count, 10);
          if (!Number.isFinite(target)) return;
          var suffix = counter.dataset.suffix || "";
          var start = performance.now();
          var duration = 1200;
          function tick(now) {
            var progress = clamp((now - start) / duration, 0, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        observer.disconnect();
      });
    }, { threshold: 0.35 });
    var stats = document.querySelector(".stats");
    if (stats) observer.observe(stats);
  }


  initHeroCanvas();
  initGsap();
  initCounters();
}());
