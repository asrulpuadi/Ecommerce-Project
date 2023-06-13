@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">

            <div class="card radius-10">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <h5 class="mb-0">All Processing Order</h5>
                        </div>
                        <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                        </div>
                    </div>
                    <hr>

                    <div class="col-lg-12">
                        <div class="table-responsive">
                            <table class="table align-middle mb-0">
                                <thead class="table-light" style="width: 100%">
                                    <tr>
                                        <th>No</th>
                                        <th>Invoice</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Order Date</th>
                                        <th>Order Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php
                                        $i = 1;
                                    @endphp
                                    @foreach ($order as $item)
                                        <tr>
                                            <td>{{ $i++ }}</td>
                                            <td>{{ $item->invoice_number }}</td>
                                            <td>{{ $item->product_name }}</td>
                                            <td>{{ $item->quantity }}</td>
                                            <td>{{ $item->total_price }}</td>
                                            <td>{{ $item->order_date }}</td>
                                            <td>
                                                <strong>
                                                    <span class="text-warning">{{ $item->order_status }}</span>
                                                </strong>
                                            </td>
                                            <td>
                                                <a href="{{ route('order.detail', ['id' => $item->id]) }}"
                                                    class="btn btn-primary btn-sm px-4 radius-30">
                                                    Detail
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
    </div>
@endsection
