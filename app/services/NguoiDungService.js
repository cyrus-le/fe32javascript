function NguoiDungService() {
    this.mangNguoiDung = [];
    this.themNguoiDung = function (nguoiDung) {
        return axios({
            method: "POST",
            url: "http://5dbacba03ec5fb0014319401.mockapi.io/api/NguoiDung",
            data: nguoiDung
        });
    };
    this.layDanhSachNguoiDung = function () {
        /**
         * 4 giao thức: 
         * GET: lấy dsnd về
         * POST: thêm người dùng lên server
         * PUT: cập nhật người dùng
         * DELETE: xóa người dùng
         */
        return axios({
            method: "GET",
            url: "http://5dbacba03ec5fb0014319401.mockapi.io/api/NguoiDung"
        });
    };
    this.xoaNguoiDung = function (id) {
        return axios({
            method: "DELETE",
            url: `http://5dbacba03ec5fb0014319401.mockapi.io/api/NguoiDung/${id}`
        });
    };
    this.suaNguoiDung = function () {
        return axios({
            method: "PUT",
            url: `http://5dbacba03ec5fb0014319401.mockapi.io/api/NguoiDung/${id}`
        });
    };
    //Lấy thông tin người dùng
    this.layThongTinNguoiDung = function(id) {
        return axios({
            method: "GET",
            url: `http://5dbacba03ec5fb0014319401.mockapi.io/api/NguoiDung/${id}`
        });
    }
    this.capNhatNguoiDung = function(id, nguoiDung) {
        return axios({
            method: "PUT",
            url: `http://5dbacba03ec5fb0014319401.mockapi.io/api/NguoiDung/${id}`,
            data: nguoiDung 
        });
    }
    this.timKiemNguoiDung = function(chuoiTimKiem, mangNguoiDung) {
        /**
         * 1. Tạo mảng rỗng mangTimKiem
         * 2. duyệt mảng người dùng
         * 3. sử dụng hàm indexOf để so sánh
         * 4. thêm người dùng tìm thấy vào mangTimKiem
         */
        console.log(chuoiTimKiem);
        // cách 1:
        // var mangTimKiem=[];
        // mangNguoiDung.map(function(item){
        //     if(item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
        //         mangTimKiem.push(item);
        //     }
        // })
        // return mangTimKiem;

        //Cách 2 dùng filter
        return mangNguoiDung.filter(function(item){
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase());
        });
    };

}
function getEle(id) {
    return document.getElementById(id);
}