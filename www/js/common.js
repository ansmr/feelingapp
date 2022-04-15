var myApp = ons.bootstrap('myApp', 'onsen');
var correction = localStorage.getItem("setting.correction");

myApp.controller("top", function ($scope, $rootScope) {
	loadParameter();
    $rootScope.start = function () {
        console.log(yyyymmddhhmiss() + " top<start>:Start!");
        myNavigator.pushPage("game_init.html");
        console.log(yyyymmddhhmiss() + " top<start>:End!");
    };
    $rootScope.settings = function () {
        console.log(yyyymmddhhmiss() + " top<settings>:Start!");
        myNavigator.pushPage("settings.html");
        console.log(yyyymmddhhmiss() + " top<settings>:End!");
    };
});
myApp.controller("settings", function ($scope, $rootScope) {
    results = JSON.parse(localStorage.getItem('results'));
    if(results!=null){
       $rootScope.results = results;
    }
    $rootScope.delHistory = function(){
    	if (confirm('履歴を消しますがいいんですね？') == false) {
    		return false;
    	} else{
    		localStorage.setItem('results','');
    	}
    };
});
myApp.controller("select", function ($scope, $rootScope) {
    $scope.select = {};
    $scope.select.name = "";
    $scope.select.list = "";
    if ($rootScope.maleNo > $rootScope.maleNum) {
        $scope.iconClass = "femaleIcon";
        $scope.select.name = $rootScope.males[$rootScope.maleNum].name;
        $scope.select.list = $rootScope.females;
    } else if ($rootScope.femaleNo > $rootScope.femaleNum) {
        $scope.iconClass = "maleIcon";
        $scope.select.name = $rootScope.females[$rootScope.femaleNum].name;
        $scope.select.list = $rootScope.males;
    } else {
        myNavigator.pushPage("next.html");
    }
    $rootScope.selMember = function (id) {
        if (confirm($scope.select.list[id].name + 'さんでいいんですね？') == false) {
            return false;
        } else {
            if ($rootScope.maleNo > $rootScope.maleNum) {
                $rootScope.males[$rootScope.maleNum].select = id;
                $rootScope.maleNum++;
            } else if ($rootScope.femaleNo > $rootScope.femaleNum) {
                $rootScope.females[$rootScope.femaleNum].select = id;
                $rootScope.femaleNum++;
            }
            myNavigator.pushPage("next.html");
        }
    };
});
myApp.controller("result", function ($scope, $rootScope) {
    var cnt = 0;
    for (i = 0; i < $rootScope.maleNo; i++) {
        var select1 = $rootScope.males[i].select;
        var select2 = $rootScope.females[select1].select;
        if (select2 == i) {
            cnt++;
        }
    }
    $rootScope.cnt = cnt;
    // 履歴を登録する。
    var result = new Array();
    var results = new Array();
    result = {
        "date":yyyymmddhhmiss(),
       "males":$rootScope.males,
     "females":$rootScope.females
    };
    var storage = JSON.parse(localStorage.getItem('results'));

    if(storage==null){
        results[0] = new Array();
        results[0] = result;
        localStorage.setItem('results',JSON.stringify(results));
    }else{
    	storage[storage.length] = result;
    	console.log(storage);
    	console.log(storage.length);
        localStorage.setItem('results',JSON.stringify(storage));
    }
    $rootScope.return = function () {
    	myNavigator.pushPage("top.html");
    };
});
myApp.controller("next", function ($scope, $rootScope) {
    if ($rootScope.maleNo > $rootScope.maleNum || $rootScope.femaleNo > $rootScope.femaleNum) {
        myNavigator.pushPage("select.html");
        return true;
    }
    myNavigator.pushPage("result.html");
    return true;
});
myApp.controller("game_init", function ($scope, $rootScope) {
    $rootScope.males = new Array();
    $rootScope.females = new Array();
    var maleNo = 0;
    var femaleNo = 0;
    $rootScope.addMale = function () {
        $rootScope.males[maleNo] = {};
        maleNo += 1;
    }
    $rootScope.addFemale = function () {
        $rootScope.females[femaleNo] = {};
        femaleNo += 1;
    }

    $rootScope.ok = function () {
        $scope.errorMessage = "";
        console.log(yyyymmddhhmiss() + " game_init<ok>:Start!");
        var i = 0;
        if (maleNo == 0) {
            $scope.errorMessage = "男性を追加して下さい。";
            return false;
        }
        for (var i = 0; i < maleNo; i++) {
            // 名前未入力チェック
            if (isBlank($rootScope.males[i].name)) {
                $scope.errorMessage = "名前が未入力の方が居ます。";
                return false;
            }
        }
        i = 0;
        if (femaleNo == 0) {
            $scope.errorMessage = "女性を追加して下さい。";
            return false;
        }
        for (var i = 0; i < femaleNo; i++) {
            // 名前未入力チェック
            if (isBlank($rootScope.females[i].name)) {
                $scope.errorMessage = "名前が未入力の方が居ます。";
                return false;
            }
        }
        $rootScope.maleNum = 0;
        $rootScope.femaleNum = 0;
        $rootScope.maleNo = maleNo;
        $rootScope.femaleNo = femaleNo;
        myNavigator.pushPage("select.html");
        console.log(yyyymmddhhmiss() + " game_init<ok>:End!");
    }
});

var yyyymmddhhmiss = function () {
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = toDoubleDigits(date.getMonth() + 1);
    var dd = toDoubleDigits(date.getDate());
    var hh = toDoubleDigits(date.getHours());
    var mi = toDoubleDigits(date.getMinutes());
    return yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + mi;
};
var toDoubleDigits = function (num) {
    num += "";
    if (num.length === 1) {
        num = "0" + num;
    }
    return num;
};
var isBlank = function(strMoji) {
    if (strMoji == "" || strMoji === undefined) {
        return true;
    } else {
        return false;
    }
};
var loadParameter = function(){


};

