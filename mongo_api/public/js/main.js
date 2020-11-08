$(document).ready(() => {
    $('.delete-article').on('click', (e) => {
        $target = $(e.target);
        const_id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/articles/' + const_id,
            success: (res) => {
                alert('Deleting Article')
                window.location.href='/';
            },
            error: function(e) {
                console.log(e);
            }
        })
    });
});