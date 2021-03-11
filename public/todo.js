//--------------------------------------------------------------------------------------------
// define namespace:
// we write an anonymous function that returns an object that encapsulates what we want to publish
var task = (function ()
{
    // private members: an array of courses and a string of the HTML to display
    var notCompletedTasksList  = []; //list of notCompletedTasksList
    var CompletedTasksList  = []; //list of CompletedTasksList

    // this is the object we want to return
    // we're going to add methods and a class definition
    var atask = {} ;// Instance of Class
    var id_task = 0; //for id of all tasks

    //function that return text of task
    atask.getTextNotCompleted= function(i){
        return notCompletedTasksList[i].taskName;
    }
    atask.getIdOfButtonCompleted= function(i){
        return CompletedTasksList[i].idOfButton;
    }
    atask.getIdOfButtonNotCompleted= function(i){
        return notCompletedTasksList[i].idOfButton;
    }
    atask.delTaskNotCompleted= function(index)// מוחק איבר בתא index
    {
        notCompletedTasksList.splice(index, 1);
    }
    //function that increase i for specific id
    atask.inc = function()
    {
        id_task = id_task + 1;
        return id_task;
    }
    //function the returns specific id
    atask.getId = function()
    {
        return id_task;
    }

    //function that return size of list
    atask.getSizeNotCompleted = function () {
        return notCompletedTasksList.length;
    }
    atask.getSizeCompleted = function () {
        return CompletedTasksList.length;
    }
    // function that add task to list
    atask.pushTaskNotCompleted = function (task) {
        notCompletedTasksList.push(task);
    }
    // function that add task to list
    atask.pushTaskCompleted = function (task) {
        CompletedTasksList.push(task);
    }

    atask.Task = (function()// הגדרת מחלקה
    {
        var task_obj = function (taskName,idOfButton)// בנאי
        {
            this.taskName = taskName;
            this.idOfButton=idOfButton;

        }
        task_obj.prototype.getTaskName = function ()//שם המשימה
        {
            return this.taskName;
        }

        return task_obj;

    })();
    // we return the object containing the 'public' functions
    return atask;
})();//----------------end of namespase
//-----------------------------------------addEventListener--------------------------------------------------------
// wait for the DOM before reaching elements
document.addEventListener('DOMContentLoaded',
    function ()
    {
        document.getElementById("but_submit").addEventListener("click", addTaskToNotCompleted);
        document.getElementById("completed").addEventListener("click", showCompleted);
        document.getElementById("bt_back").addEventListener("click",back);
        document.getElementById("text_input").addEventListener("click",deleteTexts);
    }
    ,false);
//------------------------------------------------addTask----------------------------------------------------------
//function that is activated when the button of add is pressed
function addTaskToNotCompleted()
{
    deleteTexts();
    var list = document.getElementById("list1");//האבא
    var inputText = document.getElementById("text_input").value;//קבלת טקסט
    inputText = inputText.trim();

    if (inputText !== "") // check if input is not empty
    {
        f:
        {
            for (var i = 0; i < task.getSizeNotCompleted(); i++)
            {
                if (task.getTextNotCompleted(i) === inputText )
                {
                    document.getElementById("exist").style.display = "block";
                    break f;
                }
            }

            //else of for
            var button = document.createElement("a");// יצירת כפתור +האזנה
            button.classList.add("list-group-item");
            button.classList.add("list-group-item-action");
            button.classList.add("text-dark");
            button.style="width:100% ";
            button.style="height :auto";
            button.value = inputText;
            button.innerHTML=inputText;
            button.id = task.inc();
            task.pushTaskNotCompleted(new task.Task(inputText,button.id));
            button.addEventListener("click",someOneClickedMe);
            list.appendChild(button);
            list.appendChild(document.createElement("br"));

        }
    }
    else // if input is  empty
        document.getElementById("empty").style.display = "block";

}

//----------------------------------------------------------------------------------------
//  פונקציה שכל כפתור שנוצר מאזין לה-כלומר כאשר לוחצים על כפתור מסויים אם מה שכתוב בכפתור הוא גם שם האובייקט
// אז נעתיק את האובייקט לרשימת המשימות המוכנות נמחק אותו מרשימת הלא מוכנים ונחזור.
function someOneClickedMe() {
    deleteTexts();
    var i;
    for (i=0;i<task.getSizeNotCompleted();i++)
    {
        if(task.getTextNotCompleted(i)===this.value)// מחפש האם שם הכפתור שלחצנו עליו שווה למשימה כלשהיא במערך
        {

            task.pushTaskCompleted(new task.Task(this.value,this.id) );// מוסיף אובייקט  למערך המוכנים
            task.delTaskNotCompleted(i);// מוחק ממערך הלא מוכנים
            this.style.display="none";// העלמת הכפתור

            return;
        }
    }
}
//----------------------------------------------addComplated-------------------------------------------------------
//function that is activated when the button of task is pressed
function addComplated(obj)
{
    // task.pushTaskCompleted(obj);

}
//------------------------------------------------showCompleted----------------------------------------------------
//function that is activated when the button of show completed is pressed
function showCompleted()
{
    deleteTexts();
    document.getElementById("title_1").style.display = "none";
    document.getElementById("title_2").style.display = "none";
    document.getElementById("completed").style.display = "none";
    document.getElementById("text_input").style.display = "none";
    document.getElementById("but_submit").style.display = "none";
    var i;
    for( i = 0; i <  task.getSizeCompleted(); i++)
    {
        document.getElementById( ""+task.getIdOfButtonCompleted(i)).style.display="block";
    }
    for( i = 0; i <  task.getSizeNotCompleted(); i++)
    {
        document.getElementById( ""+task.getIdOfButtonNotCompleted(i)).style.display="none";
    }

    document.getElementById("text_completed").style.display = "block";
    document.getElementById("bt_back").style.display = "block";
}
//--------------------------------------------------Home-----------------------------------------------------------
//function that is activated when the button of show back is pressed
function back()
{
    document.getElementById("title_1").style.display = "block";
    document.getElementById("title_2").style.display = "block";
    var x =document.getElementById("completed").style.display = "inline-block";


    document.getElementById("text_input").style.display = "block";
    document.getElementById("but_submit").style.display = "block";
    var i;
    for( i = 0; i <  task.getSizeNotCompleted(); i++)
    {
        document.getElementById( ""+task.getIdOfButtonNotCompleted(i)).style.display="block";
    }
    for( i = 0; i <  task.getSizeCompleted(); i++)
    {
        document.getElementById( ""+task.getIdOfButtonCompleted(i)).style.display="none";
    }
    document.getElementById("text_completed").style.display = "none";
    document.getElementById("bt_back").style.display = "none";

}
//-------------------------------------------------deleteTexts-----------------------------------------------------
//function that d'not display texts
function deleteTexts()
{
    document.getElementById("empty").style.display = "none";
    document.getElementById("exist").style.display = "none";
}