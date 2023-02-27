<?php

namespace App\Medialibrary;

use App\Models\Project;
use App\Models\ProjectQuotation;
use App\Models\ProjectQuotationPayment;
use App\Models\ProjectQuotationRevision;
use App\Models\UserVerification;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class CustomPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        $model = $media->model;

        if ($model instanceof UserVerification) return "{$model->user_id}/verifications/";

        return $media->id;
    }

    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media) . 'conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media) . 'responsive/';
    }
}
