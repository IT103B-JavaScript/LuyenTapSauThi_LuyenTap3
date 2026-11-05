# ĐÁNH GIÁ CHẤT LƯỢNG KỸ NĂNG – LẬP TRÌNH JAVASCRIPT
## THI CUỐI MÔN – [Mã đề: 006] – Cửa hàng điện thoại MobiStore
**Thời gian: 90 phút**

---

## Yêu cầu
- Xây dựng chương trình bằng JavaScript (chuẩn ES6+), chạy trong tab Console của trình duyệt; toàn bộ viết trong 01 file `app.js`.
- Chỉ dùng `let`, `const` để khai báo biến, không dùng `var`; không sử dụng thư viện bên ngoài hoặc kiến thức chưa học.
- Đặt tên biến, tên hàm theo camelCase, bằng tiếng Anh, có nghĩa; thụt lề chuẩn, mọi khối lệnh có đầy đủ dấu `{}`; có chú thích ngắn gọn mô tả nhiệm vụ của từng hàm.
- Đặt tên thư mục nộp bài: **HN_K25_[TênLớp]_[StudentName]** — thư mục chỉ chứa file `app.js`. *Ví dụ: HN_K25_CNTT5_NguyenVanA*
- Nộp bài lên LMS kèm link GitHub cá nhân.

## Thực hành

### 1. Bối cảnh
Cửa hàng điện thoại MobiStore cần chương trình quản lý danh sách sản phẩm, chạy liên tục cho đến khi nhân viên kho chọn thoát. Chương trình cho phép:
- Hiển thị danh sách sản phẩm.
- Thêm sản phẩm mới.
- Cập nhật thông tin sản phẩm.
- Xóa sản phẩm.
- Tìm kiếm sản phẩm theo hãng.
- Thoát chương trình.

### 2. Mục tiêu
Vận dụng mảng, object, function, vòng lặp, rẽ nhánh và xử lý chuỗi trong JavaScript để xây dựng chương trình menu thực hiện các thao tác CRUD trên danh sách sản phẩm, kiểm tra dữ liệu nhập và xử lý đúng các trường hợp biên.

### 3. Tài liệu

#### 3.1 Dữ liệu khởi tạo
```js
let products = [
    { productCode: "SP-001", productName: "Galaxy A55",
      brand: "Samsung Electronics",
      price: 9990, stock: 25 },
    { productCode: "SP-002", productName: "Iphone 15 Pro",
      brand: "Apple Inc",
      price: 27990, stock: 8 },
    { productCode: "SP-003", productName: "Redmi Note 13",
      brand: "Xiaomi Global",
      price: 5490, stock: 40 }
];
```

| Thuộc tính | Ý nghĩa |
|---|---|
| **productCode** | Mã sản phẩm, duy nhất, bắt đầu bằng "SP-" (string). |
| **productName** | Tên sản phẩm (string). |
| **brand** | Hãng (string). |
| **price** | Giá bán (nghìn đồng), số nguyên từ 100 đến 100000 (number). |
| **stock** | Tồn kho, số nguyên từ 0 đến 999 (number). |

- Mảng `products` khai báo bên ngoài vòng lặp menu, dùng chung cho mọi chức năng.
- Nhập dữ liệu bằng `prompt()`, hiển thị bằng `console.log()`. `prompt()` trả về `null` khi người dùng bấm Cancel.

#### 3.2 Menu chương trình
```
=======================================================
   HỆ THỐNG QUẢN LÝ SẢN PHẨM CỬA HÀNG MOBISTORE
=======================================================
1. Hiển thị danh sách sản phẩm
2. Thêm sản phẩm mới
3. Cập nhật thông tin sản phẩm
4. Xóa sản phẩm
5. Tìm kiếm sản phẩm theo hãng
0. Thoát chương trình
=======================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):
```

#### 3.3 Các hàm bắt buộc
| Hàm | Yêu cầu |
|---|---|
| **validateProductCode(code)** | Trả về thông báo lỗi đầu tiên của mã sản phẩm, hoặc "" nếu hợp lệ. |
| **findProductIndex(code)** | Trả về vị trí sản phẩm có mã code trong mảng, -1 nếu không có. |
| **normalizeText(rawText)** | Trả về chuỗi đã bỏ khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ. |
| **inputIntegerInRange(message, min, max)** | Trả về số nguyên trong [min, max] (nhập lại khi sai); Cancel trả về null. |
| **displayProducts(list)** | In danh sách sản phẩm được truyền vào. |

- Mỗi chức năng trên menu viết thành một hàm riêng; `switch...case` chỉ gọi hàm tương ứng.

### 4. Yêu cầu nghiệp vụ
Mọi dữ liệu nhập phải được xóa khoảng trắng thừa ở hai đầu trước khi xử lý; mã sản phẩm được chuyển sang chữ in hoa. Chương trình không được báo lỗi hoặc dừng đột ngột khi người dùng bấm Cancel (null).

#### 4.1. Menu điều hành
- Hiển thị lại menu sau mỗi chức năng. Chọn 0: in lời chào và kết thúc chương trình.
- Lựa chọn ngoài 0 – 5 (chuỗi rỗng, chữ cái, số thập phân, null): in thông báo lỗi và hiển thị lại menu.

#### 4.2. Case 1 – Hiển thị danh sách sản phẩm
- Danh sách rỗng: in "Danh sách sản phẩm trống".
- Mỗi sản phẩm in gồm: STT, mã sản phẩm, tên sản phẩm, hãng, giá bán (nghìn đồng), tồn kho.
- Cuối danh sách in tổng số sản phẩm.

**Ví dụ:**
```
1. SP-001 - Galaxy A55 - Samsung Electronics
   Giá bán (nghìn đồng): 9990 | Tồn kho: 25
2. SP-002 - Iphone 15 Pro - Apple Inc
   Giá bán (nghìn đồng): 27990 | Tồn kho: 8
3. SP-003 - Redmi Note 13 - Xiaomi Global
   Giá bán (nghìn đồng): 5490 | Tồn kho: 40
Tổng: 3 sản phẩm
```

#### 4.3. Case 2 – Thêm sản phẩm mới
Nhập lần lượt: mã sản phẩm, tên sản phẩm, hãng, giá bán (nghìn đồng), tồn kho. Bấm Cancel ở bất kỳ bước nào: hủy thao tác, danh sách không thay đổi.
- Mã sản phẩm kiểm tra theo thứ tự, báo lỗi đầu tiên gặp phải: (1) không rỗng; (2) tối thiểu 6 ký tự; (3) bắt đầu bằng "SP-"; (4) không chứa khoảng trắng; (5) chưa tồn tại trong danh sách. Mã sai: in lỗi và quay về menu.
- Tên sản phẩm, hãng: không được rỗng (sai thì nhập lại); bỏ khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ, ví dụ "  redmi   note 13 " → "Redmi Note 13".
- Giá bán (nghìn đồng): số nguyên từ 100 đến 100000; tồn kho: số nguyên từ 0 đến 999. Sai thì in lỗi và nhập lại.
- Thêm sản phẩm vào cuối danh sách và in đầy đủ thông tin sản phẩm vừa thêm.

**Ví dụ kiểm tra mã sản phẩm:**
| Nhập | Sau chuẩn hóa | Kết quả |
|---|---|---|
| " sp-004 " | "SP-004" | Hợp lệ |
| "sp" | "SP" | Lỗi: Độ dài nhỏ hơn 6 ký tự |
| "XX-0001" | "XX-0001" | Lỗi: Sai tiền tố "SP-" |
| "SP- 27" | "SP- 27" | Lỗi: Chứa khoảng trắng |
| " sp-002" | "SP-002" | Lỗi: Mã sản phẩm đã tồn tại |
| "  " | "" | Lỗi: Chưa nhập mã sản phẩm |
| null | – | Hủy thao tác thêm |

**Ví dụ nhập tồn kho (0 – 999):**
| Nhập | Kết quả |
|---|---|
| "" | Lỗi: chưa nhập, nhập lại |
| "abc" | Lỗi: không phải số nguyên, nhập lại |
| "-5" | Lỗi: ngoài phạm vi 0 – 999, nhập lại |
| "0.5" | Lỗi: không phải số nguyên, nhập lại |
| "1000" | Lỗi: ngoài phạm vi 0 – 999, nhập lại |
| "0" | Hợp lệ |
| null | Hủy thao tác thêm |

#### 4.4. Case 3 – Cập nhật thông tin sản phẩm
- Nhập mã sản phẩm cần cập nhật. Không tìm thấy: in "Không tìm thấy sản phẩm có mã [mã]".
- Tìm thấy: nhập giá bán (nghìn đồng) mới và tồn kho mới (cùng điều kiện như Case 2). Bấm Cancel: sản phẩm giữ nguyên giá trị cũ.
- In giá bán (nghìn đồng), tồn kho trước và sau khi cập nhật.

**Ví dụ (cột Trước/Sau ghi: giá bán (nghìn đồng) / tồn kho):**
| Mã nhập | Trước | Sau | Kết quả |
|---|---|---|---|
| " sp-003 " | 5490 / 40 | 25990 / 15 | Cập nhật thành công |
| "SP-001" | 9990 / 25 | 9990 / 25 | Bấm Cancel – đã hủy cập nhật |
| "SP-009" | – | – | Không tìm thấy |

#### 4.5. Case 4 – Xóa sản phẩm
- Nhập mã sản phẩm cần xóa. Không tìm thấy: in "Không tìm thấy sản phẩm có mã [mã]".
- Tìm thấy: hỏi xác nhận (Y/N). Chỉ "Y" hoặc "y" mới xóa; giá trị khác hoặc Cancel: in "Đã hủy thao tác xóa".
- Xóa thành công: in số sản phẩm còn lại.

**Ví dụ:**
| Mã nhập | Xác nhận | Kết quả |
|---|---|---|
| "SP-002" | "n" | Đã hủy thao tác xóa, còn 3 sản phẩm |
| " sp-002 " | " y " | Xóa thành công, còn 2 sản phẩm |
| "SP-002" | – | Không tìm thấy sản phẩm có mã SP-002 |
| "SP-003" | null | Đã hủy thao tác xóa, còn 2 sản phẩm |

#### 4.6. Case 5 – Tìm kiếm sản phẩm theo hãng
- Nhập từ khóa. Chuỗi rỗng hoặc Cancel: in "Chưa nhập từ khóa tìm kiếm".
- In các sản phẩm có hãng chứa từ khóa, không phân biệt chữ hoa/thường. Không có kết quả: in "Không tìm thấy sản phẩm phù hợp".

**Ví dụ:**
| Từ khóa | Số kết quả | Mã tìm thấy |
|---|---|---|
| "samsung" | 1 | SP-001 |
| "  APPLE " | 1 | SP-002 |
| "nokia" | 0 | Không tìm thấy sản phẩm phù hợp |
| " " hoặc null | – | Chưa nhập từ khóa tìm kiếm |

#### 4.7. Chất lượng mã nguồn và xử lý trường hợp biên
- Chỉ dùng let/const; tên biến, tên hàm camelCase có nghĩa; mọi khối lệnh có đầy đủ dấu {}; có chú thích cho từng hàm.
- Có đủ các hàm ở mục 3.3; không lặp lại đoạn mã giữa các chức năng; không gán cứng (hard-code) kết quả theo testcase.
- Chương trình không báo lỗi hoặc dừng đột ngột với bất kỳ dữ liệu nhập nào.

#### 4.8. Điểm thưởng (tối đa +10 điểm)
- **Bonus 1 (+5):** Case 1 hỏi thêm cách hiển thị: theo thứ tự hiện tại hoặc sắp xếp theo tồn kho tăng dần. Việc sắp xếp không được làm thay đổi thứ tự các phần tử trong mảng `products`.
- **Bonus 2 (+5):** khi chọn 0, in báo cáo gồm: tổng số sản phẩm, tồn kho trung bình (làm tròn 1 chữ số thập phân) và sản phẩm có tồn kho lớn nhất. Danh sách rỗng: in "Chưa có sản phẩm nào". Ví dụ:
```
==================================================
BÁO CÁO TỔNG KẾT
==================================================
Tổng số sản phẩm                : 3
Tồn kho trung bình              : 24.3
Tồn kho cao nhất                : SP-003 - Redmi Note 13 - 40
==================================================
```

### 5. Thang điểm chi tiết
| STT | Nghiệp vụ cần đạt được | Mô tả chi tiết nghiệp vụ | Điểm |
|---|---|---|---|
| 1 | Menu điều hành & tổ chức hàm | Menu lặp lại, thoát đúng khi chọn 0: 4 • switch...case đúng, có break/default: 3 • Bắt lỗi lựa chọn không hợp lệ: 3 • Mỗi chức năng là một hàm, đủ các hàm mục 3.3: 5 | 15 |
| 2 | Case 1 – Hiển thị danh sách | In đủ thông tin từng sản phẩm: 5 • Xử lý danh sách rỗng: 2 • In tổng số sản phẩm: 3 | 10 |
| 3 | Case 2 – Thêm sản phẩm | Kiểm tra mã đúng 5 điều kiện, đúng thứ tự: 8 • Kiểm tra, chuẩn hóa tên sản phẩm, hãng: 6 • Kiểm tra giá bán (nghìn đồng), tồn kho đúng phạm vi, nhập lại khi sai: 8 • Thêm object đủ thuộc tính vào cuối danh sách: 4 • In thông tin sản phẩm vừa thêm: 4 | 30 |
| 4 | Case 3 – Cập nhật sản phẩm | Tìm theo mã, báo không tìm thấy: 4 • Nhập dữ liệu mới đúng điều kiện, Cancel giữ nguyên: 5 • Cập nhật đúng object trong mảng: 4 • In giá trị trước và sau: 2 | 15 |
| 5 | Case 4 – Xóa sản phẩm | Tìm theo mã, báo không tìm thấy: 3 • Xác nhận Y/N đúng: 3 • Xóa đúng phần tử, in số còn lại: 4 | 10 |
| 6 | Case 5 – Tìm kiếm theo hãng | Kiểm tra từ khóa rỗng, null: 2 • Tìm đúng, không phân biệt hoa thường: 5 • In kết quả hoặc báo không tìm thấy: 3 | 10 |
| 7 | Chất lượng mã & trường hợp biên | let/const, camelCase, đủ dấu {}: 3 • Có chú thích cho từng hàm: 2 • Không lặp mã, không hard-code testcase: 5 | 10 |
| | **Tổng cộng** | | **100** |
| 8 | Điểm thưởng | Bonus 1 – hiển thị sắp xếp: +5 • Bonus 2 – báo cáo tổng kết: +5 • Điểm cuối cùng không vượt quá 100. | +10 |

### 6. Yêu cầu kỹ thuật
- Mọi chức năng thao tác trên cùng mảng `products`.
- Không dùng thư viện bên ngoài; chỉ nộp file `app.js`.
- Giảng viên có thể dùng thêm dữ liệu kiểm thử ngoài các ví dụ trong đề.

*Lưu ý: điểm chức năng chỉ được tính khi chương trình chạy đúng và cho kết quả chính xác với các trường hợp kiểm thử tương ứng.*

---
*Bài làm mẫu: file `De006_QuanLyCuaHangDienThoai_app.js` (đổi tên thành `app.js` khi nộp).*
