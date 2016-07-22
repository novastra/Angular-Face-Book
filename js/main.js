var trombiApp = angular.module('ng-app',[]);

trombiApp.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});

function Main($scope,  $window) {
    $scope.personnes = dataTrombi;
    var indexedbureau = [];

    $scope.afficheFiche = function(e) {
      document.getElementById("fichePNom").innerHTML = "<p>" + e.prenom + " " + e.nom + "</p>";
      document.getElementById("ficheTel").innerHTML = e.tel;
      document.getElementById("fichePiece").innerHTML = e.piece;
      document.getElementById("ficheBureau").innerHTML = e.bureau;
      document.getElementById("ficheGrade").innerHTML = e.grade;
      document.getElementById("ficheProjet").innerHTML = checkVide("<i class='fa fa-cubes'></i><span>" + e.prenom + " " + e.nom + " works on </span>", e.projet);
      document.getElementById("ficheComp").innerHTML = checkVide("<i class='fa fa-certificate'></i><span>" + e.prenom + " " + e.nom + " has knowledge in </span>", e.comp);
      document.getElementById("ficheExp").innerHTML = checkVide("<i class='fa fa-history'></i><span>" + e.prenom + " " + e.nom + " has an experience in </span>", e.exp);
      document.getElementById("ficheRef").innerHTML = checkVide("<i class='fa fa-book'></i>", e.ref);
      document.getElementById("ficheDispo").innerHTML = checkVide("<i class='fa fa-flag'></i>", e.dispo);
      document.getElementById("ficheContact").setAttribute("href", "mailto:" + e.mail);
      document.getElementById("fichePhoto").setAttribute("src", e.image);
      document.getElementById("ficheExport").setAttribute("onClick", "downl(" + e.id + ")");
      document.getElementById("overlay").setAttribute("onClick", "fermeFiche(" + e.id + ")");
      document.getElementById("clMod").setAttribute("onClick", "fermeFiche(" + e.id + ")");
      document.getElementById("node"+e.id).classList.add("affiche");
      document.getElementById("fichePerso").classList.add("modaleShow");
      document.getElementById("overlay").classList.add("overlay-show");
    };

    $scope.persBurFiltre = function() {
        indexedbureau = [];
        return $scope.personnes;
    };

    $scope.filterbureau = function(player) {
        var bureauIsNew = indexedbureau.indexOf(player.bureau) == -1;
        if (bureauIsNew) {
            indexedbureau.push(player.bureau);
        }
        return bureauIsNew;
    };
  
$scope.filter = {};  
};


/*######### FUNCTIONS IN PURE JS ##########*/
var checkVide = function(a,b){
  if (b == '' || b == null){
    return '<br>';
  }
  else{
    return a + b;    
  }
};

var affiche = function(e) {
  document.getElementById("fichePNom").innerHTML = "<p>" + e.prenom + " " + e.nom + "</p>";
  document.getElementById("ficheTel").innerHTML = e.tel;
  document.getElementById("fichePiece").innerHTML = e.piece;
  document.getElementById("ficheBureau").innerHTML = e.bureau;
  document.getElementById("ficheGrade").innerHTML = e.grade;
  document.getElementById("ficheProjet").innerHTML = checkVide("<i class='fa fa-cubes'></i><span>" + e.prenom + " " + e.nom + " works on </span>", e.projet);
  document.getElementById("ficheComp").innerHTML = checkVide("<i class='fa fa-certificate'></i><span>" + e.prenom + " " + e.nom + " has knowledge in </span>", e.comp);
  document.getElementById("ficheExp").innerHTML = checkVide("<i class='fa fa-history'></i><span>" + e.prenom + " " + e.nom + " has an experience in </span>", e.exp);
  document.getElementById("ficheRef").innerHTML = checkVide("<i class='fa fa-book'></i>", e.ref);
  document.getElementById("ficheDispo").innerHTML = checkVide("<i class='fa fa-flag'></i>", e.dispo);
  document.getElementById("ficheContact").setAttribute("href", "mailto:" + e.mail);
  document.getElementById("fichePhoto").setAttribute("src", e.image);
  document.getElementById("ficheExport").setAttribute("onClick", "downl(" + e.id + ")");
  document.getElementById("overlay").setAttribute("onClick", "fermeFiche(" + e.id + ")");
  document.getElementById("clMod").setAttribute("onClick", "fermeFiche(" + e.id + ")");
  document.getElementById("node"+e.id).classList.add("affiche");
  document.getElementById("fichePerso").classList.add("modaleShow");
  document.getElementById("overlay").classList.add("overlay-show");
};

//close person modal
var fermeFiche = function(x) {
  document.getElementsByClassName("affiche")[0].classList.remove("affiche");
  document.getElementById("fichePerso").classList.remove("modaleShow");
  document.getElementById("overlay").classList.remove("overlay-show");
};

//keyboard navigation handler  
var shFirst = function(event) {
var actual = document.getElementsByClassName("affiche")[0];

  //enter
  if (event.keyCode == 13) {  
    if (actual == undefined) {
      var fichos = document.getElementsByClassName("box")[0].id.substr(4);
      for (a in dataTrombi) {
        if (dataTrombi[a].id == fichos) {
        var prem = dataTrombi[a];
        affiche(prem);
        document.getElementById("fichePerso").classList.add("modaleShow");
        document.getElementById("overlay").classList.add("overlay-show");
        }
      }
    }
  };

  //esc
  if (event.keyCode == 27) {
    if (actual !== undefined) {
    actual.classList.remove("affiche");
    document.getElementById("fichePerso").classList.remove("modaleShow");
    document.getElementById("overlay").classList.remove("overlay-show");
    }
  };  

  //down arrow
  if (event.keyCode == 40) {
    var boxes = document.getElementsByClassName("box");  
    if (actual !== undefined) {
      for (a in boxes) {
        if (boxes[a].id == actual.id){
          var next = boxes[parseInt(a) + 1];        
          for (x in dataTrombi) {
            if (next.id.substr(4) == dataTrombi[x].id ) {
          var nextInfo = dataTrombi[x];
            actual.classList.remove("affiche");  
          affiche(nextInfo);        
          var xPos = 0;
          var yPos = 0;
          xPos += (actual.offsetLeft - actual.scrollLeft + actual.clientLeft);
          yPos += (actual.offsetTop - actual.scrollTop + actual.clientTop);
          window.scrollTo(xPos, yPos);
          document.getElementById("heados").classList.add("bandReduit");
            }
          }
        }    
      }
    }
  };

  //up arrow
  if (event.keyCode == 38) {
    var boxes = document.getElementsByClassName("box");  
    if (actual !== undefined) {
      for (a in boxes) {
        if (boxes[a].id == actual.id){
          var prev = boxes[parseInt(a) - 1];        
          for (x in dataTrombi) {
            if (prev.id.substr(4) == dataTrombi[x].id ) {
          var prevInfo = dataTrombi[x];
            actual.classList.remove("affiche");  
          affiche(prevInfo);
          var xPos = 0;
          var yPos = 0;
          xPos += (actual.offsetLeft - actual.scrollLeft + actual.clientLeft);
          yPos += (actual.offsetTop - actual.scrollTop + actual.clientTop);
          window.scrollTo(xPos, yPos - actual.offsetHeight);          
            }
          }
        }    
      }
    }
  };
  
  //right arrow
  if (event.keyCode == 39) {
    var bureau = document.getElementsByClassName("contBureau");  
    if (actual !== undefined) {
      for (x in bureau) {
        var boxes = bureau[x].getElementsByClassName("box");
        for (y in boxes) { 
        
        if (boxes[y].id == actual.id){
          nextX = parseInt(x);
          nextY = parseInt(y);
          
          if (parseInt(x)+1 >= Object.keys(bureau).length){
            nextX = 0;
            nextY = nextY+1;
          }
          else{
            nextX = nextX+1
          }; 

          // //-- to be completed -- 
          // for (bureau[nextX].getElementsByClassName("box")[nextY] == undefined) {
            // nextX += 1;
          // };
          
          if (bureau[nextX].getElementsByClassName("box")[nextY] == undefined) {
             nextX = nextX+1;
          };

          next = bureau[nextX].getElementsByClassName("box")[nextY];
          for (e in dataTrombi) {
          if (next.id.substr(4) == dataTrombi[e].id ) {
            var nextInfo = dataTrombi[e];
            actual.classList.remove("affiche");  
            affiche(nextInfo);        
            var xPos = 0;
            var yPos = 0;
            xPos += (actual.offsetLeft - actual.scrollLeft + actual.clientLeft);
            yPos += (actual.offsetTop - actual.scrollTop + actual.clientTop);
            window.scrollTo(xPos, yPos);
            document.getElementById("heados").classList.add("bandReduit");
          }
          }
        }
        }
      }
    }
  };

  //left arrow
  if (event.keyCode == 37) {
    var bureau = document.getElementsByClassName("contBureau");  
    if (actual !== undefined) {
      for (x in bureau) {
        var boxes = bureau[x].getElementsByClassName("box");
        for (y in boxes) { 

        if (boxes[y].id == actual.id){
          prevX = parseInt(x);
          prevY = parseInt(y);

          if (parseInt(x)-1 < 0){
            prevX = Object.keys(bureau).length - 1;
            prevY = prevY-1;
          }
          else{
            prevX = prevX-1
          }; 

          // //-- to be completed -- 
          // for (bureau[prevX].getElementsByClassName("box")[prevY] == undefined) {
            // prevX -= 1;
          // };
          
          if (bureau[prevX].getElementsByClassName("box")[prevY] == undefined) {
             prevX = prevX-1;
           }
          // else if (bureau[prevX].getElementsByClassName("box")[prevY] == undefined) {
          //    prevX = prevX-1;
          // };
          prev = bureau[prevX].getElementsByClassName("box")[prevY];
          for (e in dataTrombi) {
          if (prev.id.substr(4) == dataTrombi[e].id ) {
            var prevInfo = dataTrombi[e];
            actual.classList.remove("affiche");  
            affiche(prevInfo);        
            var xPos = 0;
            var yPos = 0;
            xPos += (actual.offsetLeft - actual.scrollLeft + actual.clientLeft);
            yPos += (actual.offsetTop - actual.scrollTop + actual.clientTop);
            window.scrollTo(xPos, yPos);
          }
          }
        }
        }
      }
    }
  };
};  

//download vcf  
var downl = function(e) {
  for (a in dataTrombi) {
    if (dataTrombi[a].id == e) {
    placo = dataTrombi[a];
    
    //timestamp of the vCard
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
      dd='0'+dd
    } 
    if(mm<10) {
      mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    
    var fileName = placo.prenom + ' ' + placo.nom +'.vcf';
    var mimeType = 'text/csv';
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
    
    //vCard content
    var content = "BEGIN:VCARD VERSION:3.0 \r" +
    "N:" + placo.nom + ";" + placo.prenom + "\r" +
    "FN:" + placo.prenom + " " + placo.nom + "\r" +
    "ORG:" + placo.bureau + "\r" +
    "TITLE:" + placo.grade + "\r" +
    "TEL;TYPE=work:" + placo.tel + "\r" +
    "EMAIL:" + placo.mail + "\r" +
    "NOTE:" + placo.projet + "\r" +
    "REV:" + today + "\r" +
    "END:VCARD"
    if (navigator.msSaveBlob) { // IE10
      return navigator.msSaveBlob(new Blob([content], { type: mimeType }),    
      fileName);
    } else if ('download' in a) { //html5 A[download]
      a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      setTimeout(function() {
        a.click();
        document.body.removeChild(a);
      }, 66);
      return true;
    } else { //do iframe dataURL download (old ch+FF):
      var f = document.createElement('iframe');
      document.body.appendChild(f);
      f.src = 'data:' + mimeType + ',' + encodeURIComponent(content);
      setTimeout(function() {
        document.body.removeChild(f);
      }, 333);
      return true;
      }
    }
  }
};

//back to top
var flechos = document.getElementById("retour");
var heados = document.getElementById("heados");
window.onload = function() {
  //set width of the bureau container
    var x = document.querySelectorAll(".contBureau");
    for (i = 0; i < x.length; i++) {
    contSize = (100/x.length) + '%';
        x[i].style.width = contSize;
    };
  var zoneScrollos = document.getElementById("ng-app");
  if (zoneScrollos.addEventListener) {
    zoneScrollos.addEventListener("mousewheel", MouseWheelHandler, false);
    zoneScrollos.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
  }
  else zoneScrollos.attachEvent("onwheel", MouseWheelHandler);
  
  function MouseWheelHandler(zoneScrollos) {
    // cross-browser wheel delta
    var zoneScrollos = window.event || zoneScrollos;
    var delta = Math.max(-1, Math.min(1, (zoneScrollos.wheelDelta || -zoneScrollos.detail)));
    var topos  = document.documentElement.scrollTop || window.pageYOffset;
    if (topos > 200){
      if (delta <= 0) {
      //flechos.style.display = 'none';
      flechos.classList.add("montre");
      flechos.classList.remove("versHdp");
      heados.classList.add("bandReduit");
      }
      else {
      flechos.classList.add("versHdp");
      heados.classList.add("bandReduit");
      }
      return false;
    };
    if (topos < 200) {
      flechos.classList.remove("versHdp","montre");
      heados.classList.remove("bandReduit");
    };
  };
};

function hdp() {
  window.scrollTo(0, 0);
  flechos.classList.remove("versHdp","montre");
  heados.classList.remove("bandReduit");
};