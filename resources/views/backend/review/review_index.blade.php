@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">

            <div class="card radius-10">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <h5 class="mb-0">All Review</h5>
                        </div>
                        <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                        </div>
                    </div>
                    <hr>
                    <div class="table-responsive">
                        <table class="table align-middle mb-0">
                            <thead class="table-light" style="width: 100%">
                                <tr>
                                    <th>No</th>
                                    <th>Product</th>
                                    <th>Reviewer Name</th>
                                    <th>Rating</th>
                                    <th>Comment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @php
                                    $i = 1;
                                @endphp
                                @foreach ($review as $item)
                                    <tr>
                                        <td>{{ $i++ }}</td>
                                        <td>{{ $item->product_name }}</td>
                                        <td>{{ $item->reviewer_name }}</td>
                                        <td>
                                            {{ $item->reviewer_rating }}
                                        </td>
                                        <td>{{ $item->reviewer_comment }}</td>
                                        <td>
                                            <a href="{{ route('contact.message.delete', ['id' => $item->id]) }}"
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
