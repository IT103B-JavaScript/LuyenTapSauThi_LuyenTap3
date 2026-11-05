/**
 * ĐỀ 006 - HỆ THỐNG QUẢN LÝ SẢN PHẨM CỬA HÀNG MOBISTORE
 * Bài làm: chương trình quản lý sản phẩm chạy trong tab Console của trình duyệt.
 * Chuẩn ES6+, chỉ dùng let/const, không dùng thư viện ngoài.
 */

// ==================== DỮ LIỆU KHỞI TẠO ====================
// Mảng products khai báo bên ngoài vòng lặp menu, dùng chung cho mọi chức năng
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

// Các hằng số ràng buộc dữ liệu
const CODE_PREFIX = "SP-";
const CODE_MIN_LENGTH = 6;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_STOCK = 0;
const MAX_STOCK = 999;

// ==================== CÁC HÀM BẮT BUỘC ====================

/**
 * Chuẩn hóa chuỗi: bỏ khoảng trắng thừa, viết hoa chữ cái đầu mỗi từ.
 * Ví dụ: "  redmi   note 13 " -> "Redmi Note 13"
 */
function normalizeText(rawText) {
    return rawText
        .trim()
        .split(" ")
        .filter((word) => word !== "")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

/**
 * Tìm vị trí sản phẩm theo mã sản phẩm (không phân biệt hoa/thường).
 * Trả về index trong mảng products, -1 nếu không có.
 */
function findProductIndex(code) {
    const searchCode = code.trim().toUpperCase();
    for (let i = 0; i < products.length; i++) {
        if (products[i].productCode.toUpperCase() === searchCode) {
            return i;
        }
    }
    return -1;
}

/**
 * Kiểm tra mã sản phẩm theo đúng thứ tự 5 điều kiện.
 * Trả về thông báo lỗi đầu tiên gặp phải, hoặc "" nếu hợp lệ.
 */
function validateProductCode(code) {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === "") {
        return "Lỗi: Chưa nhập mã sản phẩm";
    }
    if (normalizedCode.length < CODE_MIN_LENGTH) {
        return `Lỗi: Độ dài nhỏ hơn ${CODE_MIN_LENGTH} ký tự`;
    }
    if (!normalizedCode.startsWith(CODE_PREFIX)) {
        return `Lỗi: Sai tiền tố "${CODE_PREFIX}"`;
    }
    if (normalizedCode.includes(" ")) {
        return "Lỗi: Chứa khoảng trắng";
    }
    if (findProductIndex(normalizedCode) !== -1) {
        return "Lỗi: Mã sản phẩm đã tồn tại";
    }
    return "";
}

/**
 * Nhập một số nguyên trong đoạn [min, max], nhập sai thì báo lỗi và nhập lại.
 * Trả về số nguyên hợp lệ, hoặc null nếu người dùng bấm Cancel.
 */
function inputIntegerInRange(message, min, max) {
    while (true) {
        const rawValue = prompt(message);
        if (rawValue === null) {
            return null;
        }
        const trimmedValue = rawValue.trim();
        if (trimmedValue === "") {
            console.log("Lỗi: chưa nhập, nhập lại");
            continue;
        }
        const numberValue = Number(trimmedValue);
        if (!Number.isInteger(numberValue)) {
            console.log("Lỗi: không phải số nguyên, nhập lại");
            continue;
        }
        if (numberValue < min || numberValue > max) {
            console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`);
            continue;
        }
        return numberValue;
    }
}

/**
 * Nhập chuỗi bắt buộc (không được rỗng), tự chuẩn hóa.
 * Trả về chuỗi đã chuẩn hóa, hoặc null nếu người dùng bấm Cancel.
 */
function inputRequiredText(message, fieldLabel) {
    while (true) {
        const rawValue = prompt(message);
        if (rawValue === null) {
            return null;
        }
        const normalizedValue = normalizeText(rawValue);
        if (normalizedValue === "") {
            console.log(`Lỗi: ${fieldLabel} không được để trống, nhập lại`);
            continue;
        }
        return normalizedValue;
    }
}

/**
 * In thông tin chi tiết của một sản phẩm (dùng chung cho hiển thị, thêm, cập nhật).
 */
function printProduct(item, orderNumber) {
    console.log(`${orderNumber}. ${item.productCode} - ${item.productName} - ${item.brand}`);
    console.log(`   Giá bán (nghìn đồng): ${item.price} | Tồn kho: ${item.stock}`);
}

/**
 * In danh sách sản phẩm được truyền vào và tổng số sản phẩm ở cuối.
 */
function displayProducts(list) {
    for (let i = 0; i < list.length; i++) {
        printProduct(list[i], i + 1);
    }
    console.log(`Tổng: ${list.length} sản phẩm`);
}

// ==================== CÁC CHỨC NĂNG MENU ====================

/**
 * Case 1: Hiển thị danh sách sản phẩm.
 * Bonus 1: cho chọn hiển thị theo thứ tự hiện tại hoặc sắp xếp tồn kho tăng dần
 * (sắp xếp trên bản sao, không làm thay đổi mảng products).
 */
function showProductList() {
    if (products.length === 0) {
        console.log("Danh sách sản phẩm trống");
        return;
    }
    const displayMode = prompt(
        "Chọn cách hiển thị:\n1. Theo thứ tự hiện tại\n2. Sắp xếp theo tồn kho tăng dần"
    );
    const normalizedMode = displayMode === null ? "" : displayMode.trim();
    if (normalizedMode === "2") {
        const sortedList = [...products].sort((a, b) => a.stock - b.stock);
        console.log("--- Danh sách sản phẩm (tồn kho tăng dần) ---");
        displayProducts(sortedList);
        return;
    }
    if (normalizedMode !== "1") {
        console.log("Lựa chọn không hợp lệ, hiển thị theo thứ tự hiện tại");
    }
    console.log("--- Danh sách sản phẩm ---");
    displayProducts(products);
}

/**
 * Case 2: Thêm sản phẩm mới vào cuối danh sách.
 * Bấm Cancel ở bất kỳ bước nào: hủy thao tác, danh sách không đổi.
 */
function addProduct() {
    const cancelMessage = "Đã hủy thao tác thêm";

    const rawCode = prompt("Nhập mã sản phẩm (bắt đầu bằng SP-):");
    if (rawCode === null) {
        console.log(cancelMessage);
        return;
    }
    const newCode = rawCode.trim().toUpperCase();
    const codeError = validateProductCode(newCode);
    if (codeError !== "") {
        console.log(codeError);
        return;
    }

    const newName = inputRequiredText("Nhập tên sản phẩm:", "Tên sản phẩm");
    if (newName === null) {
        console.log(cancelMessage);
        return;
    }

    const newGroup = inputRequiredText("Nhập hãng:", "Hãng");
    if (newGroup === null) {
        console.log(cancelMessage);
        return;
    }

    const newPrice = inputIntegerInRange(
        `Nhập giá bán (nghìn đồng) (${MIN_PRICE} - ${MAX_PRICE}):`, MIN_PRICE, MAX_PRICE
    );
    if (newPrice === null) {
        console.log(cancelMessage);
        return;
    }

    const newStock = inputIntegerInRange(
        `Nhập tồn kho (${MIN_STOCK} - ${MAX_STOCK}):`, MIN_STOCK, MAX_STOCK
    );
    if (newStock === null) {
        console.log(cancelMessage);
        return;
    }

    const newProduct = {
        productCode: newCode,
        productName: newName,
        brand: newGroup,
        price: newPrice,
        stock: newStock,
    };
    products.push(newProduct);
    console.log("Thêm sản phẩm thành công:");
    printProduct(newProduct, products.length);
}

/**
 * Hỏi mã sản phẩm và trả về index của sản phẩm tìm được.
 * Trả về -1 nếu Cancel, chưa nhập hoặc không tìm thấy (đã in thông báo tương ứng).
 */
function askProductIndex(actionName) {
    const rawCode = prompt(`Nhập mã sản phẩm cần ${actionName}:`);
    if (rawCode === null) {
        console.log(`Đã hủy thao tác ${actionName}`);
        return -1;
    }
    const searchCode = rawCode.trim().toUpperCase();
    if (searchCode === "") {
        console.log("Lỗi: Chưa nhập mã sản phẩm");
        return -1;
    }
    const foundIndex = findProductIndex(searchCode);
    if (foundIndex === -1) {
        console.log(`Không tìm thấy sản phẩm có mã ${searchCode}`);
    }
    return foundIndex;
}

/**
 * Case 3: Cập nhật giá bán (nghìn đồng) và tồn kho của sản phẩm.
 * Bấm Cancel: sản phẩm giữ nguyên giá trị cũ. In giá trị trước và sau khi cập nhật.
 */
function updateProduct() {
    const foundIndex = askProductIndex("cập nhật");
    if (foundIndex === -1) {
        return;
    }
    const targetProduct = products[foundIndex];
    const oldPrice = targetProduct.price;
    const oldStock = targetProduct.stock;
    console.log(`Trước: Giá bán (nghìn đồng): ${oldPrice} | Tồn kho: ${oldStock}`);

    const newPrice = inputIntegerInRange(
        `Nhập giá bán (nghìn đồng) mới (${MIN_PRICE} - ${MAX_PRICE}):`, MIN_PRICE, MAX_PRICE
    );
    if (newPrice === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }
    const newStock = inputIntegerInRange(
        `Nhập tồn kho mới (${MIN_STOCK} - ${MAX_STOCK}):`, MIN_STOCK, MAX_STOCK
    );
    if (newStock === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }

    targetProduct.price = newPrice;
    targetProduct.stock = newStock;
    console.log("Cập nhật thành công");
    console.log(`Trước: Giá bán (nghìn đồng): ${oldPrice} | Tồn kho: ${oldStock}`);
    console.log(`Sau  : Giá bán (nghìn đồng): ${targetProduct.price} | Tồn kho: ${targetProduct.stock}`);
}

/**
 * Case 4: Xóa sản phẩm theo mã, có xác nhận Y/N.
 * Chỉ "Y" hoặc "y" mới xóa; giá trị khác hoặc Cancel thì hủy.
 */
function deleteProduct() {
    const foundIndex = askProductIndex("xóa");
    if (foundIndex === -1) {
        return;
    }
    const targetProduct = products[foundIndex];
    const confirmAnswer = prompt(
        `Bạn có chắc muốn xóa ${targetProduct.productCode} - ${targetProduct.productName}? (Y/N)`
    );
    const normalizedAnswer = confirmAnswer === null ? "" : confirmAnswer.trim();
    if (normalizedAnswer === "Y" || normalizedAnswer === "y") {
        products.splice(foundIndex, 1);
        console.log(`Xóa thành công, còn ${products.length} sản phẩm`);
    } else {
        console.log(`Đã hủy thao tác xóa, còn ${products.length} sản phẩm`);
    }
}

/**
 * Case 5: Tìm sản phẩm có hãng chứa từ khóa, không phân biệt hoa/thường.
 */
function searchProductsByBrand() {
    const rawKeyword = prompt("Nhập từ khóa hãng cần tìm:");
    if (rawKeyword === null || rawKeyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    const keyword = normalizeText(rawKeyword).toLowerCase();
    const resultList = products.filter((item) =>
        item.brand.toLowerCase().includes(keyword)
    );
    if (resultList.length === 0) {
        console.log("Không tìm thấy sản phẩm phù hợp");
        return;
    }
    console.log(`--- Kết quả tìm kiếm "${keyword}" ---`);
    displayProducts(resultList);
}

/**
 * Bonus 2: In báo cáo tổng kết khi thoát chương trình.
 * Gồm tổng số sản phẩm, tồn kho trung bình (1 chữ số thập phân) và sản phẩm có tồn kho lớn nhất.
 */
function showSummaryReport() {
    const separator = "=".repeat(50);
    if (products.length === 0) {
        console.log("Chưa có sản phẩm nào");
        return;
    }
    let totalStock = 0;
    let topProduct = products[0];
    for (const item of products) {
        totalStock += item.stock;
        if (item.stock > topProduct.stock) {
            topProduct = item;
        }
    }
    const averageStock = (totalStock / products.length).toFixed(1);

    console.log(separator);
    console.log("BÁO CÁO TỔNG KẾT");
    console.log(separator);
    console.log(`Tổng số sản phẩm`.padEnd(32) + `: ${products.length}`);
    console.log(`Tồn kho trung bình`.padEnd(32) + `: ${averageStock}`);
    console.log(
        `Tồn kho cao nhất`.padEnd(32) +
            `: ${topProduct.productCode} - ${topProduct.productName} - ${topProduct.stock}`
    );
    console.log(separator);
}

// ==================== MENU ĐIỀU HÀNH ====================

/**
 * In menu chương trình.
 */
function displayMenu() {
    const separator = "=".repeat(55);
    console.log(separator);
    console.log("   HỆ THỐNG QUẢN LÝ SẢN PHẨM CỬA HÀNG MOBISTORE");
    console.log(separator);
    console.log("1. Hiển thị danh sách sản phẩm");
    console.log("2. Thêm sản phẩm mới");
    console.log("3. Cập nhật thông tin sản phẩm");
    console.log("4. Xóa sản phẩm");
    console.log("5. Tìm kiếm sản phẩm theo hãng");
    console.log("0. Thoát chương trình");
    console.log(separator);
}

/**
 * Vòng lặp chính: hiển thị menu, đọc lựa chọn và gọi hàm tương ứng.
 * Lựa chọn ngoài 0 - 5 (rỗng, chữ, số thập phân, null) thì báo lỗi và hiện lại menu.
 */
function runProgram() {
    let isRunning = true;
    while (isRunning) {
        displayMenu();
        const rawChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
        const choice = rawChoice === null ? "" : rawChoice.trim();
        switch (choice) {
            case "1":
                showProductList();
                break;
            case "2":
                addProduct();
                break;
            case "3":
                updateProduct();
                break;
            case "4":
                deleteProduct();
                break;
            case "5":
                searchProductsByBrand();
                break;
            case "0":
                showSummaryReport();
                console.log("Cảm ơn bạn đã sử dụng chương trình. Tạm biệt!");
                isRunning = false;
                break;
            default:
                console.log("Lỗi: Lựa chọn không hợp lệ, vui lòng nhập số từ 0 đến 5");
                break;
        }
    }
}

runProgram();
