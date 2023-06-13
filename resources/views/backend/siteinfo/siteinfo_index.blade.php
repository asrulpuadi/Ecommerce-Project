@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Site Info</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">

                            <li class="breadcrumb-item active" aria-current="page">Site Info Update</li>
                        </ol>
                    </nav>
                </div>

            </div>
            <!--end breadcrumb-->
            <div class="container">
                <div class="main-body">
                    <div class="row">

                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <form action="{{ route('siteinfo.update') }}" method="post">
                                        @csrf

                                        <input type="hidden" name="id" value="{{ $siteinfo->id }}">

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">About</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <textarea id="about" name="about" placeholder="Enter Long Description">
                                                    {{ $siteinfo->about }}
                                                </textarea>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Refund</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <textarea id="refund" name="refund" placeholder="Enter Long Description">
                                                    {{ $siteinfo->refund }}
                                                </textarea>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Purchase Guide</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <textarea id="purchase_guide" name="purchase_guide" placeholder="Enter Long Description">
                                                    {{ $siteinfo->purchase_guide }}
                                                </textarea>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Privacy Policy</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <textarea id="privacy" name="privacy" placeholder="Enter Long Description">
                                                    {{ $siteinfo->privacy }}
                                                </textarea>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Address</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <textarea id="address" name="address" placeholder="Enter Long Description">
                                                    {{ $siteinfo->address }}
                                                </textarea>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Android App Link</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <input type="text" class="form-control" name="android_app_link"
                                                    value="{{ $siteinfo->android_app_link }}"
                                                    placeholder="https://www.example.com">
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">IOS App Link</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <input type="text" class="form-control" name="ios_app_link"
                                                    value="{{ $siteinfo->ios_app_link }}"
                                                    placeholder="https://www.example.com">
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Facebook Link</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <input type="text" class="form-control" name="facebook_link"
                                                    value="{{ $siteinfo->facebook_link }}"
                                                    placeholder="https://www.example.com">
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Twitter Link</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <input type="text" class="form-control" name="twitter_link"
                                                    value="{{ $siteinfo->twitter_link }}"
                                                    placeholder="https://www.example.com">
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Instagram Link</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <input type="text" class="form-control" name="instagaram_link"
                                                    value="{{ $siteinfo->instagaram_link }}"
                                                    placeholder="https://www.example.com">
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-lg-3">
                                                <h6 class="mb-0">Copy Right</h6>
                                            </div>
                                            <div class="col-lg-9 text-secondary">
                                                <input type="text" class="form-control" name="copyright_text"
                                                    value="{{ $siteinfo->copyright_text }}"
                                                    placeholder="https://www.example.com">
                                            </div>
                                        </div>



                                        <div class="row">
                                            <div class="col-sm-3"></div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="submit" class="btn btn-primary px-4" value="Update Info" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src='https://cdn.tiny.cloud/1/vdqx2klew412up5bcbpwivg1th6nrh3murc6maz8bukgos4v/tinymce/5/tinymce.min.js'
        referrerpolicy="origin"></script>
    <script>
        tinymce.init({
            selector: '#about'
        });

        tinymce.init({
            selector: '#refund'
        });

        tinymce.init({
            selector: '#purchase_guide'
        });

        tinymce.init({
            selector: '#privacy'
        });

        tinymce.init({
            selector: '#address'
        });
    </script>
@endsection
