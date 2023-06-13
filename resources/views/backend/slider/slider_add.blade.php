@extends('admin.admin_master')

@section('admin')
    <div class="page-wrapper">
        <div class="page-content">
            <h6 class="mb-0 text-uppercase">Slider Form</h6>
            <hr>

            <div class="col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <form method="POST" action="{{ route('slider.store') }}" enctype="multipart/form-data">
                            @csrf

                            <div class="mb-3">
                                <label class="form-label">Slider Image</label>
                                <input type="file" name="slider_image" id="slider_image" class="form-control mb-3">

                                @error('slider_image')
                                    <span class="text-danger">{{ $message }}</span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <img id="showImage" src="{{ url('upload/no_image.jpg') }}"
                                    style="width: 500px;height: 300px;">
                            </div>

                            <div class="row">
                                <div class="col-sm-3">
                                    <input type="submit" class="btn btn-primary px-4" value="Add Slider" />
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
            $("#slider_image").change(function(e) {
                var reader = new FileReader()
                reader.onload = function(e) {
                    $("#showImage").attr('src', e.target.result)
                }
                reader.readAsDataURL(e.target.files['0'])
            })
        })
    </script>
@endsection
