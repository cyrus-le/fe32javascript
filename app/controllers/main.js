var nguoiDungService = new NguoiDungService();
getListUser();

function themNguoiDungTrenGit() {
    console.log("thêm người dùng");
    
}


getEle("btnThemNguoiDung").addEventListener("click", function () {
    var title = "Them Nguoi Dung";
    // getclass thì phải dùng mảng
    var footer = `
    <button onclick="themNguoiDung()" id="btnThem" class="btn btn-success">Thêm</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

});
//Thêm người dùng
function themNguoiDung() {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);
    nguoiDungService.themNguoiDung(nguoiDung)
        .then(function (result) {
            console.log(result);
            getListUser();
        }).catch(function (error) {
            console.log(error);
        });
}
function renderTable(mangNguoiDung) {
    console.log()
    var contentHTML = "";
    mangNguoiDung.map(function (item, index) {
        contentHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.soDT}</td>
            <td>${item.maLoaiNguoiDung}</td>
            <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${item.id})">Sửa</button>
            <button class="btn btn-danger" onclick="xoa(${item.id})">Xóa</button>
            </td>
            </tr>
        
        
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;


}
//Chức năng xóa
function xoa(id) {
    nguoiDungService.xoaNguoiDung(id)
        .then(function (result) {
            console.log(result);
            getListUser();
        })
        .catch(function (error) {
            console.log(error.response.data);
            alert(error.response.status);
        })
}
//Chức năng sửa
function sua(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Người Dùng";
    var footer = `<button class="btn btn-success" onclick="capNhat(${id})">Cập Nhật </button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    nguoiDungService.layThongTinNguoiDung(id)
        //trong .then là 1 function - comeback function
        .then(function (result) {
            console.log(result);
            //bắt buộc là phải lấy dữ liệu trong then nếu không thì sẽ bị bất đồng bộ
            getEle("TaiKhoan").setAttribute("disabled", true);
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.loaiNguoiDung;





        })
        .catch(function (error) {
            console.log(error);

        })
}
//Chức năng cập nhật id
function capNhat(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    nguoiDungService.capNhatNguoiDung(id, nguoiDung)
    .then(function(result){
        console.log(result);
        getListUser();
        
    })
    .catch(function(error){
        console.log(error);
        
    })
    

}
//Lưu mảng người dùng xuống Local Storage
function setLocalStorage(mangNguoiDung) {
    localStorage.setItem("DanhSachNguoiDung",JSON.stringify(mangNguoiDung)); 
}
//Lấy mảng danh sách người dùng xuống localStorage
function getLocalStorage(){
    if(localStorage.getItem("DanhSachNguoiDung")){
        return JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
    }
}
//Chức năng tìm kiếm
getEle("txtSearch").addEventListener("keyup", function(){
    var chuoiTimKiem = getEle("txtSearch").value;
    var mangNguoiDung = getLocalStorage();
    console.log(mangNguoiDung);
    var mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, mangNguoiDung);
    
    
    renderTable(mangTimKiem);
})


function getListUser() {
    nguoiDungService.layDanhSachNguoiDung()
        .then(function (result) {
            this.mangNguoiDung = result.data;
            setLocalStorage(result.data);
            renderTable(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log(this.mangNguoiDung);

}

