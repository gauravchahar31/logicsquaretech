let Employees = [];
let EmployeeCount = 0;
let AvaiableEmp = 0;
let EditEmployee = null;

const editButton = 
    "<button type='button' class='editEmployee btn btn-outline-info btn-sm' data-toggle='modal' data-target='#editEmployeeModal'>" +
        "<i class='fa fa-edit'></i>&nbsp; Edit" +
    "</button>";

const deleteButton = 
    "<button type='button' class='deleteEmployee btn btn-outline-danger btn-sm'>" +
	    "<i class='fa fa-trash'></i>&nbsp; Delete" +
	"</button>";

$("#saveEmployeeData").submit(function( event ) {
    console.log($("#newEmpName").val())
    const empData = {
        empName: $("#newEmpName").val() ,
        empGender: $(this).find(":selected").text(),
        empAge: $("#newEmpAge").val(),
        empDesig: $("#newEmpDesig").val(),
        empDept: $("#newEmpDept").val(),
        empDate: $("#newEmpDate").val(),
        empAvailability: 1,
        empID: makeID()
    }
    Employees.push(empData);
    updateLocalStorage();
    listNewEmployee(empData)
    event.preventDefault();

});

$("#editEmployeeData").submit(function( event ) {
    const empData = {
        empName: $("#empName").val() ,
        empGender: $(this).find(":selected" ).text(),
        empAge: $("#empAge").val(),
        empDesig: $("#empDesig").val(),
        empDept: $("#empDept").val(),
        empDate: $("#empDate").val(),
    }
    Employees.forEach(employee => {
        if(employee.empID === EditEmployee){
            console.log(employee)
            Object.assign(employee, empData);
            console.log(employee)
        }
    })
    updateLocalStorage()
    location.reload(true)

});

function makeID(){
    let result = '';
    const characters = 'logictechsquareAssignmentForNodejsRole';
    const charLength = characters.length;
    for(let i=0; i<5; i++){
        result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

$(document).ready(function (){
    const Employees = fetchEmployees();
    if(Employees){
        Employees.sort((a, b) => (a.empAvailability > b.empAvailability) ? 1 : -1);
        EmployeeCount = Employees.length;
        $('#totalEmployees').html(EmployeeCount)
        Employees.forEach(employee => {
            if(employee.empAvailability === 1){
                AvaiableEmp += 1;
            }
            listEmployees(employee);
        });
        $('#availableEmployees').html(AvaiableEmp)
    }
    else{
        $('#availableEmployees').html(AvaiableEmp)
        $('#totalEmployees').html(EmployeeCount)
    }
})

function listEmployees(employee){
    const table = document.getElementsByClassName("table")[0].getElementsByTagName("tbody")[0];
    let checkBox;
    if(employee.empAvailability === 1){
        checkBox = "<input id='availabilityBox' type='checkbox' checked>";
    }
    else{
        checkBox = "<input id='availabilityBox' type='checkbox'>";
    }
    table.insertRow().innerHTML = 
    "<tr>" +
        "<td id='employeeName' class='" + employee.empID + "'>" + employee.empName +"</td>" +
        "<td id='employeeDept'>"+ employee.empDept + "</td>" +
        "<td>" +
            checkBox +
        "</td>" +
        "<td>" +
            editButton +
            deleteButton +
        "</td>" +
    "</tr>";
}

function listNewEmployee(employee){
    $('table > tbody > tr:first').before("<tr> <td id='employeeName' class='"+ employee.empID +"'>" + employee.empName +"</td>" +
    "<td id='employeeDept'>"+ employee.empDept + "</td>" +
    "<td> <input type='checkbox' checked='" + employee.empAvailability + "'></td>" + 
    "<td>" + editButton + deleteButton + "</td>" + "</tr>");
    EmployeeCount += 1;
    $('#totalEmployees').html(EmployeeCount)
}


$(document).ready(function(){
    $(".editEmployee").click(function(){
        const employeeID = $(this).parents("tr").find("#employeeName").attr('class');
        EditEmployee = employeeID;
        const employeeEdit = Employees.find(employee => employee.empID === employeeID );
        $("#empName").val(employeeEdit.empName);
        $("#empAge").val(employeeEdit.empAge);
        $("#empDesig").val(employeeEdit.empDesig);
        $("#empDept").val(employeeEdit.empDept);
        if(employeeEdit.empGender == "Male"){
            $("select option[value=1]").attr('selected', '');
        }
        else{
            $("select option[value=2]").attr('selected', '');
        }
        $("#empDate").val(employeeEdit.empDate);
    })
})

function fetchEmployees(){
    if(localStorage.employees){
        return Employees = JSON.parse(localStorage.employees);
    }
    return false;
}

function updateLocalStorage(){
    localStorage.employees = JSON.stringify(Employees);
}

$(document).ready(function() {
    $(':checkbox').change(function() {
        const employeeID = $(this).parents("tr").find("#employeeName").attr('class');
        if($(this).is(":checked")) {
            Employees.forEach(employee =>{
                if(employee.empID === employeeID){
                    employee.empAvailability = 1;
                    AvaiableEmp++;
                    $('#availableEmployees').html(AvaiableEmp)
                }
            })
        }
        else{
            Employees.forEach(employee =>{
                if(employee.empID === employeeID){
                    employee.empAvailability = 2;
                    AvaiableEmp--;
                    $('#availableEmployees').html(AvaiableEmp)
                }
            })
        }
        updateLocalStorage()
    });
});

$(document).ready(function(){
    $(".deleteEmployee").click(function(){
        console.log("Delete Function Trigger")
        const employeeID = $(this).parents("tr").find("#employeeName").attr('class');
        Employees.splice(Employees.findIndex((employee) => {
            return employee.empID === employeeID;
        }), 1);
        updateLocalStorage();
        EmployeeCount--;
        location.reload(true);
    })
})
