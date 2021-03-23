var arrNhanVien = [];

var validate = new Validation();

document.querySelector('#btnXacNhan').onclick = function () {
    var nhanVien = new NhanVien();
    //Lấy thông tin từ người dùng nhập vào gán vào đối tượng
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#loaiChucVu').value;        
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;
    nhanVien.hesoChucVu = nhanVien.hesoChucVu(document.querySelector('#loaiChucVu').value);
    nhanVien.XepLoaiNV = nhanVien.XepLoaiNV(document.querySelector('#soGioLam').value);

    // console.log('Nhân Vien:', nhanVien);
    // =========== Kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng ============
    var valid = true;

    valid &= validate.kiemTraRong('#maNhanVien', 'Mã nhân viên', '#kiemTraRong_maNhanVien') & validate.kiemTraRong('#tenNhanVien', 'Tên nhân viên', '#kiemTraRong_tenNhanVien');

    valid &= validate.kiemTraTatCaSo('#maNhanVien', 'mã nhân viên', '#kiemTraSo_maNhanVien');

    valid &= validate.kiemTraTatcaChu('#tenNhanVien', 'tên nhân viên', '#kiemTraChu_tenNhanVien');

    valid &= validate.kiemTraDoDai('#maNhanVien', 'Mã nhân viên', '#kiemTraDoDai_maNhanVien', 4, 6);

    valid &= validate.kiemTraGiaTri('#luongCoBan', 'Lương cơ bản', '#kiemTraGiaTri_luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri('#soGioLam', 'Số giờ làm trong tháng', '#kiemTraGiaTri_soGioLam', 50, 150);

    if (!valid) {
        return;
    }


    // // Mỗi lần click thêm nhân viên => lấy đối tượng nhân viên lưu vào mảng
    // arrNhanVien.push(nhanVien);
    // //Sau khi thêm nhân viên vào mảng => lấy mảng nhân viên tạo ra chuỗi thẻ tr rồi in lên giao diện
    // renderTableNhanVien(arrNhanVien);

    // //Lưu data vào storage
    //  luuStorage();
    // goi  api de dua du lieu ve server luu tru
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien', //duong dan den file chua du lieu hoac api do backend cung cap
        method: 'POST',//do back end cung cap
        data: nhanVien, //Format data phai dung dinh dang backend can
        repsonseType: 'json'//kieu du lieu tra ve do backend cung cap
    });
    // xu ly khi requet thanh cong

    promise.then(function (result) {
        console.log('xu ly thanh cong', result.data);
        // goi ham lay lai du lieu moi nhat
        renderNhanVien();
    });

    //xu ly khi that bai
    promise.catch(function (err) {
        console.log('xu ly that bai', error);
    });

}

var renderTableNhanVien = function (mangNhanVien) {
    var content = '';
    for (var i = 0; i < mangNhanVien.length; i++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
        var nhanVien = mangNhanVien[i];
        var nv = new NhanVien(nhanVien.maNhanVien,nhanVien.tenNhanVien,nhanVien.chucVu,nhanVien.luongCoBan,nhanVien.soGioLamTrongThang,);
        
        content += `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>                
                <td>${nv.luongCoBan}</td>
                <td>${nv.TinhLuong(nv.luongCoBan,nv.hesoChucVu(nv.chucVu))}</td>
                <td>${nv.soGioLamTrongThang}</td>   
                <td>${nv.XepLoaiNV(nv.soGioLamTrongThang)}</td>             
                <td>   
                <button class="btn btn-danger mb-1" onclick="chinhSua('${nv.maNhanVien}')" >Chỉnh sửa</button>                                        
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')" >Xoá</button>                           
                </td>
            </tr>
        `
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}

// get------------------------
var renderNhanVien = function () {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanlyNhanVienApi/LayDanhSachNhanVien', //duong dan den file chua du lieu hoac api do backend cung cap
        method: 'GET',//do back end cung cap
        repsonseType: 'json'//kieu du lieu tra ve do backend cung cap
    })
    // xu ly khi requet thanh cong
    promise.then(function (result) {        
        console.log('xu ly thanh cong', result.data);
        // hien thi thong tin sinh vien len giao dien
        renderTableNhanVien(result.data);
    });

    //xu ly khi that bai
    promise.catch(function (err) {
        // console.log(err);
        console.log('xu ly that bai', err);
    });
   
}

// Delete------------------------
window.xoaNhanVien = function (maNhanVien) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`, //duong dan den file chua du lieu hoac api do backend cung cap
        method: 'Delete',//do back end cung cap        
    });
    // xu ly khi requet thanh cong

    promise.then(function (result) {
        console.log('xu ly thanh cong', result.data);
        // goi ham lay lai du lieu moi nhat
        renderNhanVien();
    });

    //xu ly khi that bai
    promise.catch(function (err) {
        console.log('xu ly that bai', error.repsonse.data);
    });
}
renderNhanVien();

window.chinhSua = function (maNhanVien) {
    axios(
        {
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
            method: 'GET',//do back end cung cap        
        }
    ).then(function (result) {
        console.log('xu ly thanh cong', result.data);
        var nv = result.data;
        //Load lại lên control phía trên 
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#loaiChucVu').value = nv.chucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLam').value = nv.soGioLamTrongThang;        
    }
    ).catch(function (err) {
        console.log('xu ly that bai', error);
    }
    );
}

document.querySelector('#btnCapNhat').onclick = function () {
    var nv = new NhanVien();
    //Load lại lên control phía trên 
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.chucVu = document.querySelector('#loaiChucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLam').value;    

    axios(
        {
            url: `http://svcy.myclass.vn/api/QuanlyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nv.maNhanVien}`,
            method: 'PUT',//do back end cung cap  
            data: nv
        }
    ).then(function (result) {
        renderNhanVien();
    }
    ).catch(function (err) {
        console.log('xu ly that bai', error.repsonse.data);
    }
    );
}


// // luu truc tiep tren may local
// var luuStorage = function () {
//     //Biến đổi mảng (arrNhanVien) thành chuỗi
//     var chuoiArrNhanVien = JSON.stringify(arrNhanVien);
//     //Lưu vào localstorage
//     localStorage.setItem('arrNhanVien',chuoiArrNhanVien);
// }
// var layDataStorage = function () {

//     //Kiểm tra có storage đó hay không
//     if(localStorage.getItem('arrNhanVien')){
//         //Dữ liệu lấy ra từ localstorage là dạng chuỗi
//         var chuoiArrNhanVien = localStorage.getItem('arrNhanVien');
//         //Chuyễn chuỗi json về object json
//         arrNhanVien = JSON.parse(chuoiArrNhanVien);

//         //Gọi hàm render table từ dữ liệu trong storage
//         renderTableNhanVien(arrNhanVien);
//     }
// }
// layDataStorage();