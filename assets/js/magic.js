$(document).ready(() => {
    // window.addEventListener('beforeunload', function (event) {
    //     event.preventDefault(); // برای سازگاری با مرورگرهای قدیمی
    //     event.returnValue = 'آیا مطمئنید می‌خواهید صفحه را ترک کنید؟ داده‌های ذخیره‌نشده از بین خواهند رفت.'; 
    // });
    function scrollToBottom() {
        const element = $('#result-table-div');
        element.scrollTop = element.scrollTop(element[0].scrollHeight);
    }
    function scrollToTop() {
        window.scrollTo({
            top: 0,
        });
    }
    // ==============
    $("#about-me-btn").click(() => {
        $("#main-page").addClass("!hidden")
        $("#about-me").removeClass("!hidden")
    })
    // ==============
    // Local Variable
    var GameOverScore = 1165
    var GameSettingData = {}
    var firstGroup = {
        index: 1,
        name: 'ما',
        score: 0,
        score_detail: {
            postives: 0,
            negatives: 0
        },
        player: {
            f_player: {
                name: 'سجاد',
                negative_point: 0,
                postive_point: 0
            },
            s_player: {
                name: 'ایلیا',
                negative_point: 0,
                postive_point: 0
            },
        }
    }
    var secondGroup = {
        index: 2,
        name: 'اونا',
        score: 0,
        score_detail: {
            postives: 0,
            negatives: 0
        },
        player: {
            f_player: {
                name: 'امیرحسین',
                negative_point: 0,
                postive_point: 0
            },
            s_player: {
                name: 'علیرضا',
                negative_point: 0,
                postive_point: 0
            },
        }
    }
    var typeOfGame
    // -----------
    $("#new-game-btn").click(() => {
        $("#main-page").addClass("!hidden")
        $("#start-game-setting").removeClass("!hidden")
    })
    // ===================================================
    $("#back-to-main-page").click(() => {
        $("#start-game-setting").addClass("!hidden")
        $("#main-page").removeClass("!hidden")
    })
    // ==================================================
    // Game set
    $("#new-game-set-btn").click(() => {
        if ($("#new-game-set-menu").hasClass("opacity-0")) {
            $("#new-game-set-menu").removeClass("opacity-0")
            $("#new-game-set-menu").removeClass("!right-[-200%]")
            $("#unTransparentLayar").removeClass("!hidden")
            $("#thead").removeClass("sticky")
            $("#start-game-page").addClass("!overflow-hidden")
        }
        else {
            $("#new-game-set-menu").addClass("opacity-0")
            $("#new-game-set-menu").addClass("!right-[-200%]")
            $("#unTransparentLayar").addClass("!hidden")
            $("#thead").addClass("sticky")
            $("#start-game-page").removeClass("!overflow-hidden")
        }
    })
    $("#start-game-btn").click(() => {
        // $("#start-game-setting").addClass("!hidden")
        // $("#start-game-page").removeClass("!hidden")
        GameSetting()
        $("#th-firstGroupName").html(firstGroup.name)
        $("#th-secondGroupName").html(secondGroup.name)
    })
    // ===================================================================
    // window of game menu
    $("#exit-game-go-to-main-page").click(() => {
        window.location.reload()
        // $("#start-game-page").addClass("!hidden")
        // $("#main-page").removeClass("!hidden")
    })
    const GameSetting = () => {
        firstGroup.name = $("#first-group-name").val() != '' ? $("#first-group-name").val() : 'ما'
        firstGroup.player.f_player.name = $("#first-group-player-name").val() != '' ? $("#first-group-player-name").val() : 'ایلیا'
        firstGroup.player.s_player.name = $("#first-group-player2-name").val() != '' ? $("#first-group-player2-name").val() : 'سجاد'
        secondGroup.name = $("#second-group-name").val() != '' ? $("#second-group-name").val() : 'اونا'
        secondGroup.player.f_player.name = $("#second-group-player-name").val() != '' ? $("#second-group-player-name").val() : 'امیرحسین'
        secondGroup.player.s_player.name = $("#second-group-player2-name").val() != '' ? $("#second-group-player2-name").val() : 'علیرضا'
        typeOfGame = "withJoker";
        let withJoker = $("#withJoker")[0].checked
        let withOutJoker = $("#withOutJoker")[0].checked
        if (withJoker) {
            typeOfGame = "withJoker"
        }
        else if (withOutJoker) {
            typeOfGame = "withOutJoker"
        }
        if ($("#custom-score-input").val()) {
            GameOverScore = Number($("#custom-score-input").val())
        }
        GameSettingData = {
            firstGroup,
            secondGroup,
            typeOfGame,
            GameOverScore,
        }
        // ----------------------------------------------------------------------
        $("#start-game-setting").addClass("!hidden")
        $("#start-game-page").removeClass("!hidden")


    }
    const setValueOfGameOverScore = val => {
        GameOverScore = val ?? val
        $("#custom-score-input-div").addClass("!hidden")
        $("#custom-score-input").val('')
    }
    $("#towThousend").click(() => {
        setValueOfGameOverScore(Number($("#towThousend").val()))
    })
    $("#sixty").click(() => {
        setValueOfGameOverScore(Number($("#sixty").val()))
    })
    $("#thousend").click(() => {
        setValueOfGameOverScore(Number($("#thousend").val()))
    })
    $("#custom").click(() => {
        if ($("#custom-score-input-div").hasClass("!hidden")) {
            $("#custom-score-input-div").removeClass("!hidden")
        }
    })
    // ---------------------------------------------------------------------------------------------------------
    // Game Has been Started!
    // Local Variables
    var AllSets = []
    var whichGroupRead = null
    var whoRead = null
    var howMuchRead = null
    var otherSideScore = null
    var countOfSet = 1
    var didTheyGet = null
    let thisSet = {
        ev: 'set',
        dubblePostiveForOtherside: false,
        dubbleNegative: false,
        shelem: false,
        didTheyGet,
    }
    $("#new-set-btn").click(() => {
        $("#new-game-set-menu").addClass("!hidden")
        $("#new-game-set-menu").addClass("opacity-0")
        $("#new-game-set-menu").addClass("!right-[-200%]")
        $("#unTransparentLayar").addClass("!hidden")
        $("#thead").addClass("sticky")
        $("#start-game-page").removeClass("!overflow-hidden")
        $("#new-game-set").removeClass("!hidden")
        setTimeout(() => {
            $("#new-game-set-menu").removeClass("!hidden")
        }, 300)
        $("#fg-lable").html(firstGroup.name)
        $("#set-first-group-name").val(firstGroup.name)
        $("#sg-lable").html(secondGroup.name)
        $("#set-second-group-name").val(secondGroup.name)
    })
    $(".set_group_name").click(function () {
        let groupName = $(this).val()

        if (groupName == firstGroup.name) {
            whichGroupRead = firstGroup
            var players = `
            <div class="flex mx-4">
              <label class="mx-1" for="f_ply_name">${firstGroup.player.f_player.name}</label>
              <input class='set_player_name' value='${firstGroup.player.f_player.name}' type="radio" name="ply_name" id="f_ply_name">
            </div>
            <div class="flex mx-4">
              <label class="mx-1" for="s_ply_name">${firstGroup.player.s_player.name}</label>
              <input class='set_player_name' value='${firstGroup.player.s_player.name}' type="radio" name="ply_name" id="s_ply_name">
            </div>
            `
            $("#box-of-players-name").html(players)
        }
        if (groupName == secondGroup.name) {
            whichGroupRead = secondGroup
            var players = `
            <div class="flex mx-4">
              <label class="mx-1" for="f_ply_name">${secondGroup.player.f_player.name}</label>
              <input class='set_player_name' value='${secondGroup.player.f_player.name}' type="radio" name="ply_name" id="f_ply_name">
            </div>
            <div class="flex mx-4">
              <label class="mx-1" for="s_ply_name">${secondGroup.player.s_player.name}</label>
              <input class='set_player_name' value='${secondGroup.player.s_player.name}' type="radio" name="ply_name" id="s_ply_name">
            </div>
            `
            $("#box-of-players-name").html(players)
        }
        if (!whichGroupRead) {
            $("#error-alert-whichGroupRead").removeClass("!hidden")
        }
        else {
            $("#error-alert-whichGroupRead").addClass("!hidden")
            $("#dude-commited-name-div").removeClass("!hidden")
            $(".set_player_name").click(function () {
                let plyName = $(this).val()
                whoRead = plyName
                if (!whoRead) {
                    $("#error-alert-whoRead").removeClass("!hidden")
                }
                else {
                    $("#error-alert-whoRead").addClass("!hidden")
                }
            })
        }

    })
    $("#dubbleShelem").click(() => {
        howMuchRead = "dubbleShelem"
        if (newGameSettingValidator()) {
            $("#new-game-set").addClass("!hidden")
            if (whichGroupRead.index == 2) {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${firstGroup.name} : `)
            }
            else {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${secondGroup.name} : `)
            }
            $("#otherside-score-div").removeClass("!hidden")
            $("#otherside-score-input").focus()
            scrollToTop()
        }

    })
    $("#Shelem").click(() => {
        howMuchRead = "shelem"
        if (newGameSettingValidator()) {
            $("#new-game-set").addClass("!hidden")
            if (whichGroupRead.index == 2) {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${firstGroup.name} : `)
            }
            else {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${secondGroup.name} : `)
            }
            $("#otherside-score-div").removeClass("!hidden")
            $("#otherside-score-input").focus()
            scrollToTop()

        }

    })
    $("#read-score-input").keypress(() => {
        howMuchRead = Number($("#read-score-input").val())
        if (!howMuchRead) {
            $("#error-alert-readScore").removeClass("!hidden")
        }
        else {
            $("#error-alert-readScore").addClass("!hidden")
        }
    })
    $("#register-game").click(() => {
        howMuchRead = Number($("#read-score-input").val())
        if (newGameSettingValidator()) {
            if (whichGroupRead.index == 2) {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${firstGroup.name} : `)
            }
            else {
                $("#score-get-by-otherside").html(`امتیاز گرفته شده توسط ${secondGroup.name} : `)
            }
            $("#new-game-set").addClass("!hidden")
            $("#otherside-score-div").removeClass("!hidden")
            $("#otherside-score-input").focus()
            scrollToTop()

        }

    })
    $("#otherside-score-btn").click(() => {
        otherSideScore = Number($("#otherside-score-input").val())
        if (scoreGetbyOtherSideValidator()) {
            if (otherSideScore == 0) {
                thisSet.shelem = true
            }
            if (otherSideScore > 100 && howMuchRead != "dubbleShelem" && howMuchRead != "shelem") {
                var confirmST = confirm("دوبل مثبت (ok) , دوبل منفی (cancel)")
                if (confirmST) {
                    thisSet.dubblePostiveForOtherside = true
                }
                else {
                    thisSet.dubbleNegative = true
                }
            }

            thisSet = {
                ...thisSet,
                id: Math.floor(Math.random() * 1000),
                whichGroupRead,
                howMuchRead,
                whoRead,
                otherSideScore,
                countOfSet
            }
            AllSets.push(thisSet)
            countOfSet++
            setTableViewAndScors()
            $("#otherside-score-div").addClass("!hidden")
            resetFormOfNewSet()
        }
        scrollToTop()
    })
    // remove set
    $(document).on('click', '.remove-set-btn', function () {
        let id = $(this).parents("tr").attr('set-id')
        const index = AllSets.findIndex(item => item.id == id);
        if (index > -1) {
            AllSets.splice(index, 1);
            console.log(AllSets)
        }
        setTableViewAndScors()
    })
    // ----------------------------------------------------
    // remove last set btn
    $("#remove-last-set-btn").click(() => {
        AllSets.pop()
        setTableViewAndScors()
        $("#new-game-set-menu").addClass("opacity-0")
        $("#new-game-set-menu").addClass("!right-[-200%]")
        $("#unTransparentLayar").addClass("!hidden")
        $("#thead").addClass("sticky")
        $("#start-game-page").removeClass("!overflow-hidden")
    })
    // ----------------------------------------------------
    // Reset Forms
    const resetFormOfNewSet = () => {
        $("#set-first-group-name")[0].checked = false
        $("#set-second-group-name")[0].checked = false
        $("#f_ply_name")[0].checked = false
        $("#s_ply_name")[0].checked = false
        $("#dude-commited-name-div").addClass("!hidden")
        $("#read-score-input").val('')
        $("#otherside-score-input").val('')
        whichGroupRead = null
        whoRead = null
        howMuchRead = null
        thisSet = {
            ev: 'set',
            dubblePostiveForOtherside: false,
            dubbleNegative: false,
            shelem: false,
            didTheyGet,
        }

    }

    // =========================================================
    // Cheating Methods
    var Cheating_options = {
        id: null,
        ev: `cheat`,
        amount: 0,
        to: null,
        signed: null,
    }
    $(".cheating_to").click(function () {
        Cheating_options.to = $(this).val()
    })
    $(".cheating_signed").click(function () {
        Cheating_options.signed = $(this).val()
    })
    $(".cheat-amout-radio").click(function () {
        Cheating_options.amount = Number($(this).val())
    })
    $("#register-cheating-btn").click(() => {
        let chAmountInput = Number($("#cheat-amout-input").val())
        if (chAmountInput) {
            Cheating_options.amount = chAmountInput
        }
        Cheating_options.id = Math.floor(Math.random() * 1000)
        AllSets.push(Cheating_options)
        setTableViewAndScors()
        $("#cheating-div").addClass("!hidden")
        resetCheatingForm()
    })
    $("#show-cheating-box-btn").click(() => {
        $("#f_gr_label").html(firstGroup.name)
        $("#s_gr_label").html(secondGroup.name)
        $("#f_gr").val(firstGroup.name)
        $("#s_gr").val(secondGroup.name)
        $("#new-game-set-menu").addClass("!hidden")
        $("#cheating-div").removeClass("!hidden")
        $("#new-game-set-menu").addClass("opacity-0")
        $("#new-game-set-menu").addClass("!right-[-200%]")
        $("#unTransparentLayar").addClass("!hidden")
        $("#thead").addClass("sticky")
        $("#start-game-page").removeClass("!overflow-hidden")
        setTimeout(() => {
            $("#new-game-set-menu").removeClass("!hidden")
        }, 300)
    })
    $("#cancel-cheat-btn").click(() => {
        $("#cheating-div").addClass("!hidden")
        resetCheatingForm()
    })
    // ============================
    // remove set actions

    // reset cheating form
    const resetCheatingForm = () => {
        $("#cheating_smal")[0].checked = false
        $("#cheating_big")[0].checked = false
        $("#cheat-amout-input").val('')
        $("#chaet_pos")[0].checked = false
        $("#cheat_neg")[0].checked = false
        $("#f_gr")[0].checked = false
        $("#s_gr")[0].checked = false
        Cheating_options = {
            ev: 'cheat',
            amount: 0,
            to: null,
            signed: null,
        }
    }
    // ===========================================================
    // Validators
    const newGameSettingValidator = () => {
        if (whichGroupRead && whoRead && howMuchRead) {
            if (howMuchRead <= 200 && howMuchRead >= 100 && howMuchRead % 5 == 0 || howMuchRead == "shelem" || howMuchRead == "dubbleShelem") {
                return true
            }
            else {
                $("#error-alert-readScore").removeClass("!hidden")

                return false
            }
        }
        else {
            if (!whichGroupRead) {
                $("#error-alert-whichGroupRead").removeClass("!hidden")
            }
            else {
                $("#error-alert-whichGroupRead").addClass("!hidden")
            }
            if (!whoRead) {

                $("#error-alert-whoRead").removeClass("!hidden")
            }
            else {
                $("#error-alert-whoRead").addClass("!hidden")
            }
            if (!howMuchRead) {
                $("#error-alert-readScore").removeClass("!hidden")
            }
            else {
                $("#error-alert-readScore").addClass("!hidden")
            }
            return false
        }
    }
    const scoreGetbyOtherSideValidator = () => {
        if (otherSideScore == null) {
            $("#error-alert-otherSide-score").removeClass("!hidden")
            return false
        }
        else {
            if (otherSideScore > 200 || otherSideScore % 5 != 0) {
                $("#error-alert-otherSide-score").removeClass("!hidden")
                return false
            }
            else {
                $("#error-alert-otherSide-score").addClass("!hidden")
                return true
            }

        }
    }
    // ==============================================================================
    // Add To Table Function
    const AddToTableGameSet = (thisSetT, setNumber) => {
        var firstGroupScoreForThisSet = 0
        var secondGroupScoreForThisSet = 0
        // =========================================================
        // First Group Logic
        if (thisSetT.whichGroupRead.index == 1) {
            if (thisSetT.shelem && thisSetT.howMuchRead != "dubbleShelem" && thisSetT.howMuchRead != "shelem") {
                firstGroupScoreForThisSet = thisSetT.howMuchRead * 2
                thisSetT.didTheyGet = true
            }
            // ---------------------------------------------------------
            else if (thisSetT.dubblePostiveForOtherside) {
                secondGroupScoreForThisSet = thisSetT.otherSideScore * 2
                firstGroupScoreForThisSet = -thisSetT.howMuchRead
                thisSetT.didTheyGet = false

            }
            // ---------------------------------------------------------
            else if (thisSetT.dubbleNegative) {
                firstGroupScoreForThisSet = thisSetT.howMuchRead * -2
                secondGroupScoreForThisSet = thisSetT.otherSideScore
                thisSetT.didTheyGet = false
            }
            // ---------------------------------------------------------
            // =========================================================
            else if (thisSetT.howMuchRead == "dubbleShelem") {
                if (thisSetT.otherSideScore > 0) {

                    firstGroupScoreForThisSet = -800
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false
                }
                else {
                    firstGroupScoreForThisSet = 800
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true
                }
            }
            // ------------------------------------------------------------------
            else if (thisSetT.howMuchRead == "shelem") {
                if (thisSetT.otherSideScore > 0) {
                    firstGroupScoreForThisSet = -400
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false

                }
                else {
                    firstGroupScoreForThisSet = 400
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true

                }
            }
            else {
                var scoreHasGet = 200 - thisSetT.otherSideScore
                if (scoreHasGet >= thisSetT.howMuchRead) {
                    thisSetT.didTheyGet = true
                    firstGroupScoreForThisSet = scoreHasGet
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                }
                else {
                    thisSetT.didTheyGet = false
                    firstGroupScoreForThisSet = -thisSetT.howMuchRead
                    secondGroupScoreForThisSet = thisSetT.otherSideScore
                }
            }
            // computing scores ...  ---------------------------------------------------------
            if (thisSetT.whoRead == firstGroup.player.f_player.name) {
                if (thisSetT.didTheyGet) {
                    firstGroup.player.f_player.postive_point += firstGroupScoreForThisSet
                }
                else {
                    firstGroup.player.f_player.negative_point += firstGroupScoreForThisSet
                }
            }
            else {
                if (thisSetT.didTheyGet) {
                    firstGroup.player.s_player.postive_point += firstGroupScoreForThisSet
                }
                else {
                    firstGroup.player.s_player.negative_point += firstGroupScoreForThisSet
                }
            }
        }
        // ---------------------------------------------------------

        // =========================================================
        // Scond Group Logic
        if (thisSetT.whichGroupRead.index == 2) {
            if (thisSetT.shelem && thisSetT.howMuchRead != "dubbleShelem" && thisSetT.howMuchRead != "shelem") {
                secondGroupScoreForThisSet = thisSetT.howMuchRead * 2
                thisSetT.didTheyGet = true
            }
            // ---------------------------------------------------------
            else if (thisSetT.dubblePostiveForOtherside) {
                firstGroupScoreForThisSet = thisSetT.otherSideScore * 2
                secondGroupScoreForThisSet = -thisSetT.howMuchRead
                thisSetT.didTheyGet = false

            }
            // ---------------------------------------------------------
            else if (thisSetT.dubbleNegative) {
                secondGroupScoreForThisSet = thisSetT.howMuchRead * -2
                firstGroupScoreForThisSet = thisSetT.otherSideScore
                thisSetT.didTheyGet = false
            }
            // ---------------------------------------------------------
            // =========================================================
            else if (thisSetT.howMuchRead == "dubbleShelem") {
                if (thisSetT.otherSideScore > 0) {
                    secondGroupScoreForThisSet = -800
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false


                }
                else {
                    secondGroupScoreForThisSet = 800
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true


                }
            }
            // ---------------------------------------------------------
            else if (thisSetT.howMuchRead == "shelem") {
                if (thisSetT.otherSideScore > 0) {
                    secondGroupScoreForThisSet = -400
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = false
                }
                else {
                    secondGroupScoreForThisSet = 400
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                    thisSetT.didTheyGet = true
                }
            }
            else {
                var scoreHasGet = 200 - thisSetT.otherSideScore
                if (scoreHasGet >= thisSetT.howMuchRead) {
                    thisSetT.didTheyGet = true
                    secondGroupScoreForThisSet = scoreHasGet
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                }
                else {
                    thisSetT.didTheyGet = false
                    secondGroupScoreForThisSet = -thisSetT.howMuchRead
                    firstGroupScoreForThisSet = thisSetT.otherSideScore
                }
            }
            // ------------------------
            // ------------------------
            if (thisSetT.whoRead == secondGroup.player.f_player.name) {
                if (thisSetT.didTheyGet) {
                    secondGroup.player.f_player.postive_point += secondGroupScoreForThisSet
                }
                else {
                    secondGroup.player.f_player.negative_point += secondGroupScoreForThisSet
                }
            }
            else {
                if (thisSetT.didTheyGet) {
                    secondGroup.player.s_player.postive_point += secondGroupScoreForThisSet
                }
                else {
                    secondGroup.player.s_player.negative_point += secondGroupScoreForThisSet
                }
            }
        }
        // computing pos and negative scores =========================================================
        if (thisSetT.whichGroupRead.index == 1) {
            if (thisSetT.didTheyGet) {
                firstGroup.score_detail.postives += firstGroupScoreForThisSet
            }
            else {
                secondGroup.score_detail.negatives += secondGroupScoreForThisSet
            }
        }
        // =---------------------------------------------------------
        if (thisSetT.whichGroupRead.index == 2) {
            if (thisSetT.didTheyGet) {
                secondGroup.score_detail.postives += secondGroupScoreForThisSet
            }
            else {
                firstGroup.score_detail.negatives += firstGroupScoreForThisSet
            }
        }
        // =========================================================
        // =========================================================
        firstGroup.score += firstGroupScoreForThisSet
        secondGroup.score += secondGroupScoreForThisSet
        let NewSetRowTableHtml = `
            <tr set-id='${thisSetT.id}'>
            <td>${thisSetT.countOfSet}</td>
            <td class='
            ${thisSetT.whichGroupRead.index == 1 && thisSetT.didTheyGet ? '!text-purple-600' :
                thisSetT.whichGroupRead.index == 1 && !thisSetT.didTheyGet ? '!text-red-500' :
                    thisSetT.whichGroupRead.index == 2 && thisSetT.didTheyGet ? '!text-black' :
                        thisSetT.whichGroupRead.index == 2 && !thisSetT.didTheyGet ? '!text-purple-600' : null
            }'>${firstGroupScoreForThisSet}</td>



            <td class='flex flex-col ${!thisSetT.didTheyGet ? '!text-red-500' : "!text-purple-600"}'>
            <div>
            ${thisSetT.whoRead} :
             ${thisSetT.howMuchRead == "dubbleShelem" ? "شلم*2" :
                thisSetT.howMuchRead == "shelem" ? "شلم" :
                    thisSetT.howMuchRead
            }
            </div>
            <span class='
             ${thisSetT.whichGroupRead.index == 2 ? 'far fa-hand-point-left' : ' far fa-hand-point-right'}
             '></sapn>
             </td>
             <td class='
            ${thisSetT.whichGroupRead.index == 1 && thisSetT.didTheyGet ? '!text-black' :
                thisSetT.whichGroupRead.index == 1 && !thisSetT.didTheyGet ? '!text-purple-600' :
                    thisSetT.whichGroupRead.index == 2 && thisSetT.didTheyGet ? '!text-purple-600' :
                        thisSetT.whichGroupRead.index == 2 && !thisSetT.didTheyGet ? '!text-red-500' : null
            }'>${secondGroupScoreForThisSet}</td>
            <td><span class='remove-set-btn  flex justify-center items-center text-2xl text-red-500 fa fa-close'><span></td>
          </tr>
        `
        $("#tbody").append(NewSetRowTableHtml)
        if (GameIsOver()) {
            ShowTheResultOfGame()
        }
        firstGroupScoreForThisSet = 0
        secondGroupScoreForThisSet = 0
    }

    const AddToTabelCheat = (Cheating_optionsT) => {
        var firstGroupScoreForThisSet = 0
        var secondGroupScoreForThisSet = 0
        if (Cheating_optionsT.to == firstGroup.name) {
            if (Cheating_optionsT.signed == "pos") {
                secondGroupScoreForThisSet = Cheating_optionsT.amount
            }
            else if (Cheating_optionsT.signed == "neg") {
                firstGroupScoreForThisSet = -Cheating_optionsT.amount
            }
        }
        // -------------------------------------------------------
        if (Cheating_optionsT.to == secondGroup.name) {
            if (Cheating_optionsT.signed == "pos") {
                firstGroupScoreForThisSet = Cheating_optionsT.amount
            }
            else if (Cheating_optionsT.signed == "neg") {
                secondGroupScoreForThisSet = -Cheating_optionsT.amount
            }
        }
        // -------------------------------------------------------
        firstGroup.score += firstGroupScoreForThisSet
        secondGroup.score += secondGroupScoreForThisSet


        var newcheatSetHtml = `
         <tr set-id='${Cheating_optionsT.id}'>
          <td> ${'*'} </td>
          <td class="
          ${firstGroupScoreForThisSet > 0 ? 'text-green-500' : 'text-red-500'}
          "> ${firstGroupScoreForThisSet}</td>
            <td class=" text-red-500 flex flex-col justify-center items-center"> <strong>تقلب</strong>
             <span class='
             ${Cheating_optionsT.to == secondGroup.name ? 'text-red-500 far fa-hand-point-left' : 'text-red-500 far fa-hand-point-right'}
             '></sapn>
            </td>
          <td class="
          ${secondGroupScoreForThisSet > 0 ? 'text-green-500' : 'text-red-500'}
          ">${secondGroupScoreForThisSet}</td>
    
          <td ><span class='remove-set-btn text-red-500 fa fa-close'></span></td>
        </tr>
        `
        $("#tbody").append(newcheatSetHtml)

        if (GameIsOver()) {
            ShowTheResultOfGame()
        }

    }
    const resettheScores = () => {
        firstGroup.score = 0
        secondGroup.score = 0
        firstGroup.score_detail.postives = 0
        firstGroup.score_detail.negatives = 0
        secondGroup.score_detail.postives = 0
        secondGroup.score_detail.negatives = 0
        firstGroup.player.f_player.postive_point = 0
        firstGroup.player.f_player.negative_point = 0
        firstGroup.player.s_player.postive_point = 0
        firstGroup.player.s_player.negative_point = 0
        secondGroup.player.f_player.postive_point = 0
        secondGroup.player.f_player.negative_point = 0
        secondGroup.player.s_player.postive_point = 0
        secondGroup.player.s_player.negative_point = 0
    }
    const updateResult = () => {
        let res = `
        <strong class='flex flex-col justify-center items-center ${firstGroup.score > secondGroup.score ? 'text-green-500' : 'text-red-500'}'>
        <span>${firstGroup.score}</span>
        <span class='text-[10px] text-gray-500'>(${GameOverScore - firstGroup.score})</span>
        </strong>
        <strong class="text-xs">اختلاف : (${Math.abs(firstGroup.score - secondGroup.score)})</strong>
        <strong class=' flex flex-col justify-center items-center ${firstGroup.score < secondGroup.score ? 'text-green-500' : 'text-red-500'}'>
        <span>${secondGroup.score}</span>
        <span class='text-[10px] text-gray-500'>(${GameOverScore - secondGroup.score})</span>
        </strong>

        `
        $("#res-game-div").html(res)
    }
    const setTableViewAndScors = () => {
        resettheScores()
        $("#tbody").html('')
        AllSets.map((thisSet, index) => {
            if (thisSet.ev == 'set') {
                AddToTableGameSet(thisSet, index + 1)
            }
            else if (thisSet.ev == 'cheat') {
                AddToTabelCheat(thisSet)
            }
        })
        scrollToBottom();
        updateResult()

    }

    const GameIsOver = () => {
        if (firstGroup.score >= GameOverScore || secondGroup.score >= GameOverScore) {
            return true
        }
        else {
            return false
        }
    }
    const ShowTheResultOfGame = () => {
        $("#start-game-page").addClass("!hidden")
        $("#result-of-game").removeClass("!hidden")
        let winerGroup, loserGroup
        if (firstGroup.score > secondGroup.score) {
            winerGroup = firstGroup
            loserGroup = secondGroup
        }
        else {
            winerGroup = secondGroup
            loserGroup = firstGroup
        }

        let res = `
            <div class="flex justify-between items-center p-5">
      <div class="flex py-5 w-1/2 border-l-2 border-purple-600 flex-col justify-center items-center">
        <img class="!w-36 !h-28" src="./assets/img/taj.png" alt="">
        <strong  class="my-2 text-green-500">برنده !</strong>
        <p class="font-bold my-2">${winerGroup.name}</p>
        <p class="font-bold my-2 text-purple-500">${winerGroup.score}</p>
        <p class="font-bold text-sm my-2">${winerGroup.score_detail.negatives} گزاشتن کون حریف</p>
        <p class="font-bold text-sm my-2">${winerGroup.score_detail.postives} گرفتن از خایه های خود</p>
        <div class="font-bold text-sm my-2 flex justify-center items-center">
          <p class="mx-2">${winerGroup.player.f_player.name}</span>
          <div class="flex flex-col">
            <span class='text-red-500'>${winerGroup.player.f_player.negative_point}</span>
            <span class='text-green-500'>${winerGroup.player.f_player.postive_point}</span>
          </div>
        </div>
        <div class="font-bold text-sm my-2 flex justify-center items-center">
          <p class="mx-2">${winerGroup.player.s_player.name}</span>
          <div class="flex flex-col">
            <span class='text-red-500'>${winerGroup.player.s_player.negative_point}</span>
            <span class='text-green-500'>${winerGroup.player.s_player.postive_point}</span>
          </div>
        </div>
      </div>
      <div class="flex w-1/2  flex-col justify-center items-center">
        <img class="!w-32 !h-28" src="./assets/img/golden_fuck.png" alt="">
        <strong class="my-2 text-red-500">بازنده !</strong>
        <p class="font-bold my-2">${loserGroup.name}</p>
        <p class="font-bold my-2 text-red-500">${loserGroup.score}</p>
        <p class="font-bold text-sm my-2">${loserGroup.score_detail.negatives} گزاشتن کون حریف</p>
        <p class="font-bold text-sm my-2">${loserGroup.score_detail.postives} گرفتن از خایه های خود</p>
        <div class="font-bold text-sm my-2 flex justify-center items-center">
          <p class="mx-2">${loserGroup.player.f_player.name}</span>
          <div class="flex flex-col">
            <span class='text-red-500'>${loserGroup.player.f_player.negative_point}</span>
            <span class='text-green-500'>${loserGroup.player.f_player.postive_point}</span>
          </div>
        </div>
        <div class="font-bold text-sm my-2 flex justify-center items-center">
          <p class="mx-2">${loserGroup.player.s_player.name}</span>
          <div class="flex flex-col">
            <span class='text-red-500'>${loserGroup.player.s_player.negative_point}</span>
            <span class='text-green-500'>${loserGroup.player.s_player.postive_point}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-center items-center p-5">
      <div class="my-2  p-3">
        <p><strong class='!text-yellow-300'>MVP</strong> : <span id='mvp-name'></span></p>
      </div>
      <div class="my-2 border-r-2 border-purple-500 p-3">
        <p><strong class='text-red-500'>KVT</strong>  : <span id='kvt-name'></span></p>
      </div>
    </div>
    <div class="p-5 flex justify-center items-center w-full my-5">
      <button id='show-the-scores-back' class="bg-lime-50 mx-5 text-lime-600 ring-4 ring-lime-300 rounded-sm w-32 py-3">دیدن امتیازات</button>
      <button onclick="window.location.reload()" class="bg-red-50 mx-5 text-red-600 ring-4 ring-red-300 rounded-sm w-32 py-3">خروج</button>
    </div>
        `
        $("#result-of-game").html(res)
        calculatePlayersRank();

    }
    // ============================
    $(document).on('click', "#show-the-scores-back", function () {
        $("#start-game-page").removeClass("!hidden")
        $("#result-of-game").addClass("!hidden")
    })
    // ============================
    function calculatePlayersRank() {
        const players = [firstGroup.player.f_player,
        firstGroup.player.s_player, secondGroup.player.f_player, secondGroup.player.s_player]
        const playersWithNetScore = players.map(player => {
            return {
                ...player,
                netScore: player.postive_point + player.negative_point
            };
        });

        const sortedPlayers = [...playersWithNetScore].sort((a, b) => b.netScore - a.netScore);

        const bestPlayer = sortedPlayers[0];
        const worstPlayer = sortedPlayers[sortedPlayers.length - 1];
        $("#mvp-name").html(bestPlayer.name)
        $("#kvt-name").html(worstPlayer.name)
        return {
            bestPlayer,
            worstPlayer,
            allPlayers: sortedPlayers
        };
    }



})