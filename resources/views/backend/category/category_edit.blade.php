@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">
            <h6 class="mb-0 text-uppercase">Category Edit Form</h6>
            <hr>

            <div class="col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <form method="POST" action="{{ route('category.update') }}" enctype="multipart/form-data">
                            @csrf
                            <input type="hidden" name="id" value="{{ $category->id }}">

                            <div class="mb-3">
                                <label class="form-label">Category Name</label>
                                <input type="text" name="category_name" class="form-control"
                                    value="{{ $category->category_name }}" placeholder="Input Category Name">

                                @error('category_name')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Category Image</label>
                                <input type="file" name="category_image" id="category_image" class="form-control mb-3">

                                <img id="showImage" src="{{ asset($category->category_image) }}"
                                    style="width: 100px;height: 100px;">
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <input type="submit" class="btn btn-primary px-4" value="Update Category" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script type="text/javascript">
        $(document).ready(function() {
            $("#category_image").change(function(e) {
                var reader = new FileReader()
                reader.onload = function(e) {
                    $("#showImage").attr('src', e.target.result)
                }
                reader.readAsDataURL(e.target.files['0'])
            })
        })
    </script>
@endsection
