@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Order Detail</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Invoice : <strong><span class="text-primary">{{ $detail->invoice_number }}</span></strong>
                            </li>
                        </ol>
                    </nav>
                </div>

            </div>
            <!--end breadcrumb-->
            <div class="container">
                <div class="main-body">
                    <div class="row">

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Product Name :</span></strong>
                                            {{ $detail->product_name }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Product Code :</span></strong>
                                            {{ $detail->product_code }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Product Size :</span></strong>
                                            {{ $detail->size }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Product Color :</span></strong>
                                            {{ $detail->color }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Product Quantity :</span></strong>
                                            {{ $detail->quantity }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Unit Price :</span></strong>
                                            {{ $detail->unit_price }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Total Price :</span></strong>
                                            {{ $detail->total_price }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">User Email :</span></strong>
                                            {{ $detail->email }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">User Name :</span></strong>
                                            {{ $detail->name }}
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Payment Method :</span></strong>
                                            {{ $detail->payment_method }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Delivery Address :</span></strong>
                                            {{ $detail->delivery_address }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">City :</span></strong>
                                            {{ $detail->city }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Delivery Charge :</span></strong>
                                            {{ $detail->delivery_charge }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Order Date :</span></strong>
                                            {{ $detail->order_date }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Order Time :</span></strong>
                                            {{ $detail->order_time }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong><span class="text-dark">Order Status :</span></strong>
                                            @if ($detail->order_status == 'Pending')
                                                <span class="badge bg-dark">{{ $detail->order_status }}</span>
                                            @elseif ($detail->order_status == 'Processing')
                                                <span class="badge bg-warning">{{ $detail->order_status }}</span>
                                            @else
                                                <span class="badge bg-success">{{ $detail->order_status }}</span>
                                            @endif

                                        </li>
                                        <br>
                                        @if ($detail->order_status == 'Pending')
                                            <a href="{{ route('processing.confirm', ['id' => $detail->id]) }}"
                                                class="btn btn-block btn-success">Processing Order</a>
                                        @elseif ($detail->order_status == 'Processing')
                                            <a href="{{ route('complete.confirm', ['id' => $detail->id]) }}"
                                                class="btn btn-block btn-success">Complete Order</a>
                                        @endif
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
