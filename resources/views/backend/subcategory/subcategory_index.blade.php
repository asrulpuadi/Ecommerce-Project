@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">

            <div class="card radius-10">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <h5 class="mb-0">Sub Category</h5>
                        </div>
                        <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                        </div>
                    </div>
                    <hr>
                    <div class="table-responsive">
                        <table class="table align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>No</th>
                                    <th>Category Name</th>
                                    <th>Sub Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                    $i = 1;
                                @endphp
                                @foreach ($subcategories as $item)
                                    <tr>
                                        <td>{{ $i++ }}</td>
                                        <td>{{ $item->category_name }}</td>
                                        <td>{{ $item->sub_category_name }}</td>
                                        <td>
                                            <a href="{{ route('subcategory.edit', ['id' => $item->id]) }}"
                                                class="btn btn-primary btn-sm px-4 radius-30">
                                                Edit
                                            </a>
                                            <a href="{{ route('subcategory.delete', ['id' => $item->id]) }}"
                                                class="btn btn-danger btn-sm px-4 radius-30" id="delete">
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
