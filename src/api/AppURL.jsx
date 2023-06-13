class AppURL {
    static BaseURL = "http://127.0.0.1:8000/api";
    static VisitorDetails = this.BaseURL + "/get-visitor";

    //url site info
    static AllSiteInfo = this.BaseURL + "/allsiteinfo";

    //url all category
    static AllCategoryDetails = this.BaseURL + "/allcategory";

    //url product list
    static ProductListByRemark(remarkParam) {
        return this.BaseURL + "/product-list-by-remark/" + remarkParam;
    }
    static ProductListByCategory(categoryParam) {
        return this.BaseURL + "/product-list-by-category/" + categoryParam;
    }
    static ProductListBySubCategory(categoryParam, subcategoryParam) {
        return this.BaseURL + "/product-list-by-subcategory/" + categoryParam + "/" + subcategoryParam;
    }

    //url home slider
    static HomeSliderImage = this.BaseURL + "/homeslider";

    //url product detail
    static Productetail(id) {
        return this.BaseURL + "/product-detail/" + id;
    }

    //url notification history
    static Notification = this.BaseURL + "/notification";

    //url product detail
    static ProductSearch(searchkey) {
        return this.BaseURL + "/search/" + searchkey;
    }

    //url suggested product
    static SuggestedProduct(suggested) {
        return this.BaseURL + "/sugegestedproduct/" + suggested;
    }

    //url review list
    static ReviewList(product_code) {
        return this.BaseURL + "/reviewlist/" + product_code;
    }

    //Review Product
    static PostReview = this.BaseURL + "/postreview";

    // cart
    static AddToCart = this.BaseURL + "/addtocart";

    static CartCount = this.BaseURL + "/cartcount";

    static CartList(email) {
        return this.BaseURL + "/cartlist/" + email;
    }

    static RemoveCartList(id) {
        return this.BaseURL + "/removecartlist/" + id;
    }

    static CartItemPlus(id, quantity, price) {
        return this.BaseURL + "/cartitemplus/" + id + "/" + quantity + "/" + price;
    }

    static CartItemMinus(id, quantity, price) {
        return this.BaseURL + "/cartitemminus/" + id + "/" + quantity + "/" + price;
    }

    static CartOrder = this.BaseURL + "/cartorder";

    static OrderList(email) {
        return this.BaseURL + "/orderlist/" + email;
    }

    //favourite
    static AddFavourite(product_code, email) {
        return this.BaseURL + "/favourite/" + product_code + "/" + email;
    }

    static FavouriteList(email) {
        return this.BaseURL + "/favouritelist/" + email
    }

    static FavouriteRemove(id, email) {
        return this.BaseURL + "/favouriteremove/" + id + "/" + email;
    }



    //
    //-- user auth
    //

    static UserLogin = this.BaseURL + "/login";
    static UserRegister = this.BaseURL + "/register";
    static UserData = this.BaseURL + "/user";
    static UserLogout = this.BaseURL + "/logout"
    static UserForgetPassword = this.BaseURL + "/forgetpassword"
    static UserResetPassword = this.BaseURL + "/resetpassword"
    //
    //-- end user auth
    //

}

export default AppURL;