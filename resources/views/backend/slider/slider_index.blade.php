@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">

            <div class="card radius-10">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <h5 class="mb-0">Slider</h5>
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
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                    $i = 1;
                                @endphp
                                @foreach ($sliders as $item)
                                    <tr>
                                        <td>{{ $i++ }}</td>
                                        <td>
                                            <img src="{{ $item->slider_image }}" alt=""
                                                style="width: 500px;height: 150px;">
                                        </td>
                                        <td>
                                            <a href="{{ route('slider.edit', ['id' => $item->id]) }}"
                                                class="btn btn-primary btn-sm px-4 radius-30">
                                                Edit
                                            </a>
                                            <a href="{{ route('slider.delete', ['id' => $item->id]) }}"
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
