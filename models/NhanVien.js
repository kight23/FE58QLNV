var NhanVien = function(maNV,tenNV,CVu,luongCB,soGL){
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.chucVu = CVu;    
    this.luongCoBan = luongCB;
    this.soGioLamTrongThang = soGL;
    this.hesoChucVu = (cv) => {
        var hs = '';
        if (cv === 'Nhân viên')
        {
            hs = 1;
        }
        else if(cv === 'Quản lý')
        {
            hs = 1.5;
        }
        else if(cv === 'Giám đốc')
        {
            hs = 3;
        }
        return hs;
    }
    

    

    this.TinhLuong = (lcb,hscv)=>{
        var KQL = '';
        KQL = lcb * hscv;        
        return KQL;
    }
    this.XepLoaiNV = (sgl)=>{
        var KQXL = '';
        if(sgl < 90 && sgl >= 50)
        { 
            KQXL = 'Nhân viên bình thường';
        }
        else if(sgl >= 90 && sgl < 120)
        {
            KQXL = 'Nhân viên giỏi';
        }
        else if(sgl >= 120 && sgl <= 150)
        {
            KQXL = 'Nhân viên xuất xắc';
        }
        return KQXL;
    }
}