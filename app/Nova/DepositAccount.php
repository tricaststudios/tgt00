<?php

namespace App\Nova;

use DmitryBubyakin\NovaMedialibraryField\Fields\Medialibrary;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Image;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\MediaLibrary\HasMedia;

class DepositAccount extends Resource
{
    /**
     * The logical group associated with the resource.
     *
     * @var string
     */
    public static $group = 'Financing';

    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\DepositAccount>
     */
    public static $model = \App\Models\DepositAccount::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'address';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'address',
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make()->sortable(),
            Medialibrary::make('QR')
                ->resolveMediaUsing(function (HasMedia $model, string $collectionName) {
                    return $model->getMedia('avatar');
                })
                ->attachUsing(function (HasMedia $model, UploadedFile $file, string $collectionName, string $diskName, string $fieldUuid) {
                    $fileAdder = $model->addMedia($file);

                    $fileAdder->toMediaCollection('avatar', 'public');
                })
                ->single()
                ->mediaOnIndex(function (HasMedia $resource, string $collectionName) {
                    return $resource->media()->where('collection_name', 'avatar')->limit(1)->get();
                }),

            Text::make('Name')->rules('required'),
            Text::make('Address')->rules('required'),
            Boolean::make('Is Active')->rules('boolean')
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function cards(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function filters(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function lenses(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function actions(NovaRequest $request)
    {
        return [];
    }
}
