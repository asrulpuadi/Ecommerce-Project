@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">
            <h6 class="mb-0 text-uppercase">Sub Category Edit Form</h6>
            <hr>

            <div class="col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <form method="POST" action="{{ route('subcategory.update') }}" enctype="multipart/form-data">
                            @csrf

                            <input type="hidden" name="id" value="{{ $subcategory->id }}">

                            <div class="mb-3">
                                <label class="form-label">Category Name</label>
                                <select class="form-select mb-3" name="category_name">
                                    <option value="">Select Category</option>
                                    @foreach ($categories as $item)
                                        <option value="{{ $item->category_name }}"
                                            {{ $item->category_name == $subcategory->category_name ? 'selected' : '' }}>
                                            {{ $item->category_name }}
                                        </option>
                                    @endforeach
                                </select>

                                @error('category_name')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>



                            <div class="mb-3">
                                <label class="form-label">Sub Category Name</label>
                                <input type="text" name="sub_category_name" class="form-control"
                                    placeholder="Input Sub Category Name" value="{{ $subcategory->sub_category_name }}">

                                @error('sub_category_name')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <input type="submit" class="btn btn-primary px-4" value="Update Sub Category" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
