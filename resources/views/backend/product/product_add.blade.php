@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">
            <div class="card">
                <div class="card-body p-4">
                    <h5 class="card-title">Add New Product</h5>
                    <hr />
                    <div class="form-body mt-4">
                        <form method="POST" action="{{ route('product.store') }}" enctype="multipart/form-data">
                            @csrf

                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="border border-3 p-4 rounded">

                                        <div class="mb-3">
                                            <label for="inputProductTitle" class="form-label">Product Title</label>
                                            <input type="text" class="form-control" name="title"
                                                placeholder="Enter product title">
                                        </div>

                                        <div class="mb-3">
                                            <label for="inputProductTitle" class="form-label">Product Code</label>
                                            <input type="text" class="form-control" name="product_code"
                                                placeholder="Enter product code">
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Product Thumbnail</label>
                                            <input type="file" name="image" id="image" class="form-control mb-3">

                                            <img id="showImage" src="{{ url('upload/no_image.jpg') }}"
                                                style="width: 200px;height: 200px;">
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Image One</label>
                                            <input type="file" name="image_one" class="form-control mb-3">
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Image Two</label>
                                            <input type="file" name="image_two" class="form-control mb-3">
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Image Three</label>
                                            <input type="file" name="image_three" class="form-control mb-3">
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Image Four</label>
                                            <input type="file" name="image_four" class="form-control mb-3">
                                        </div>

                                        <div class="mb-3">
                                            <label for="inputProductDescription" class="form-label">Short
                                                Description</label>
                                            <textarea class="form-control" name="short_description" rows="2" placeholder="Enter Short Description"></textarea>
                                        </div>

                                        <div class="mb-3">
                                            <label for="inputProductDescription" class="form-label">Long Description</label>
                                            <textarea id="mytextarea" name="long_description" placeholder="Enter Long Description"></textarea>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="border border-3 p-4 rounded">
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label for="inputPrice" class="form-label">Price</label>
                                                <input type="text" class="form-control" name="price"
                                                    placeholder="00000">
                                            </div>

                                            <div class="col-md-6">
                                                <label for="inputCompareatprice" class="form-label">Special Price</label>
                                                <input type="text" class="form-control" name="special_price"
                                                    placeholder="00000">
                                            </div>

                                            <div class="col-12">
                                                <label for="inputProductType" class="form-label">Product Category</label>
                                                <select class="form-select" name="category">
                                                    <option value="">Select Category</option>
                                                    @foreach ($category as $item)
                                                        <option value="{{ $item->category_name }}">
                                                            {{ $item->category_name }}
                                                        </option>
                                                    @endforeach
                                                </select>

                                                @error('category')
                                                    <span class="text-danger">{{ $message }}</span>
                                                @enderror
                                            </div>

                                            <div class="col-12">
                                                <label for="inputVendor" class="form-label">Product Sub Category</label>
                                                <select class="form-select" name="subcategory">
                                                    <option value="">Select Sub Category</option>
                                                    @foreach ($subcategory as $item)
                                                        <option value="{{ $item->sub_category_name }}">
                                                            {{ $item->sub_category_name }}
                                                        </option>
                                                    @endforeach
                                                </select>

                                                @error('subcategory')
                                                    <span class="text-danger">{{ $message }}</span>
                                                @enderror
                                            </div>

                                            <div class="col-12">
                                                <label for="inputCollection" class="form-label">Brand</label>
                                                <select class="form-select" name="brand">
                                                    <option value="">Select Brand</option>
                                                    <option value="APPLE">APPLE</option>
                                                    <option value="GUCCI">GUCCI</option>
                                                    <option value="LENOVO">LENOVO</option>
                                                    <option value="OPPO">OPPO</option>
                                                    <option value="POTATO CHIPS">POTATO CHIPS</option>
                                                    <option value="McDonald's">McDonald's</option>
                                                    <option value="VICTORIA">VICTORIA</option>
                                                    <option value="WINGSFOOD">WINGSFOOD</option>
                                                </select>
                                            </div>

                                            <div class="col-12">
                                                <label for="inputProductTags" class="form-label">Product Size</label>
                                                <input type="text" name="size" class="form-control"
                                                    data-role="tagsinput" placeholder="Enter product size">
                                            </div>

                                            <div class="col-12">
                                                <label for="inputProductTags" class="form-label">Product Color</label>
                                                <input type="text" name="color" class="form-control"
                                                    data-role="tagsinput" placeholder="Enter product color">
                                            </div>

                                            <div class="col-12">
                                                <label for="inputProductTags" class="form-label">Choose Remark
                                                    Product</label>

                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="remark"
                                                        value="COLLECTION">
                                                    <label class="form-check-label"
                                                        for="flexRadioDefault1">COLLECTION</label>
                                                </div>

                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="remark"
                                                        value="FEATURED">
                                                    <label class="form-check-label"
                                                        for="flexRadioDefault1">FEATURED</label>
                                                </div>

                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="remark"
                                                        value="NEW">
                                                    <label class="form-check-label" for="flexRadioDefault1">NEW</label>
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <div class="d-grid">
                                                    <button type="submit" class="btn btn-primary">Save Product</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--end row-->
                        </form>

                    </div>
                </div>
            </div>

        </div>
    </div>

    <script type="text/javascript">
        $(document).ready(function() {

            $("#image").change(function(e) {
                var reader = new FileReader()
                reader.onload = function(e) {
                    $("#showImage").attr('src', e.target.result)
                }
                reader.readAsDataURL(e.target.files['0'])
            })
        })
    </script>

    <script src='https://cdn.tiny.cloud/1/vdqx2klew412up5bcbpwivg1th6nrh3murc6maz8bukgos4v/tinymce/5/tinymce.min.js'
        referrerpolicy="origin"></script>
    <script>
        tinymce.init({
            selector: '#mytextarea'
        });
    </script>
@endsection
