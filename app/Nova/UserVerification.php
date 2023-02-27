<?php

namespace App\Nova;

use App\Nova\Actions\MarkAsApproved;
use DmitryBubyakin\NovaMedialibraryField\Fields\Medialibrary;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Laravel\Nova\Fields\Badge;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\MediaLibrary\HasMedia;

class UserVerification extends Resource
{
    /**
     * The logical group associated with the resource.
     *
     * @var string
     */
    public static $group = 'User Management';

    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\UserVerification>
     */
    public static $model = \App\Models\UserVerification::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'uuid';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'user.username', 'user.email',
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
            BelongsTo::make('User'),
            Text::make('First Name'),
            Badge::make('Status')->map([
                'pending' => 'warning',
                'approved' => 'success',
            ]),
            Text::make('Last Name'),
            Text::make('Mobile Number'),
            Text::make('Identification Type'),
            Text::make('Identification Value'),
            Medialibrary::make('Attachments')
                ->resolveMediaUsing(function (HasMedia $model, string $collectionName) {
                    return $model->getMedia('attachments');
                })
                ->attachUsing(function (HasMedia $model, UploadedFile $file, string $collectionName, string $diskName, string $fieldUuid) {
                    $fileAdder = $model->addMedia($file);

                    $fileAdder->toMediaCollection('attachments', $diskName);
                })
                ->autouploading()
                ->mediaOnIndex(1),
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
        return [
            (new MarkAsApproved)->canRun(fn () => true)
        ];
    }
}
